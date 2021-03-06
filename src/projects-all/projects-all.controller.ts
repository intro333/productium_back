import { Express } from 'express';
import {
  Controller,
  Post,
  Body,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ProjectsAllService } from './projects-all.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  IProject,
  ISimpleProjectsInfo,
} from '../interfaces/projects.interface';
import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { Helper } from '../shared/helper';
import * as fs from 'fs';
import { customFileName } from '../shared/helper';
import { UsersService } from '../users/users.service';
import { ProjectEntity } from '../model/projects.entity';
import { User } from '../model/user.entity';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '../interfaces/user.interface';
import { AppService } from '../app.service';

@Controller('api/projects-all')
export class ProjectsAllController {
  constructor(
    private readonly appService: AppService,
    private pAServ: ProjectsAllService,
    private servUser: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('')
  public async getInitData(@Body() payload: { userId: number }) {
    let projects: ProjectEntity[] = [];
    const projectIds: number[] = [];
    const shareUsers = {};
    /* Projects of current user */
    await this.pAServ.getProjectsByUserId(payload).then((_items) => {
      _items.forEach((_item) => {
        delete _item.users;
        projectIds.push(_item.id);
      });
      projects = _items;
    });
    /* Users of selected projects */
    await this.servUser.getUsersByProjectIds(projectIds).then((_items) => {
      _items.forEach((_item: IUser) => {
        if (_item.id !== payload.userId) {
          if (shareUsers[_item.id]) { /* Юзер уже записан */
            const _projects = shareUsers[_item.id].projects;
            _projects.push(_item.project_id);
            shareUsers[_item.id].projects = _projects;
          } else {
            shareUsers[_item.id] = {
              id: _item.id,
              fullName: _item.fullName,
              projects: [_item.project_id],
            };
          }
        }
      });
    });
    console.log('USER --------->', payload.userId);
    console.log('projectIds', projectIds);
    console.log('shareUsers', shareUsers);
    return {
      projects,
      shareUsers,
    };
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('update-all-data-per-time')
  public async updateAllDataPerTime(@Body() payload: { userId: number }) {
    let projects: ProjectEntity[] = [];
    if (payload.userId) {
      const user = await this.servUser.getUserById(payload.userId);
      delete user.password;
      delete user.salt;
      await this.pAServ.getProjectsByUserId(payload).then((_items) => {
        _items.forEach((_item) => {
          delete _item.users;
        });
        projects = _items;
      });
      return projects;
    }
    return projects;
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('set-data')
  public async setData(@Body() payload: IProject) {
    if (payload.userId) {
      const user = await this.servUser.getUserById(payload.userId);
      delete user.password;
      delete user.salt;
      payload.users = [user];
    }
    return await this.pAServ.setData(payload);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('share-project')
  public async shareProject(
    @Body() payload: { projectId: number; userId: number },
  ) {
    let projectResult: ProjectEntity | null = null;
    const shareUsers = {};
    if (payload.userId && payload.projectId) {
      const user = await this.servUser.getUserById(payload.userId);
      const project = await this.pAServ.getProjectById(payload.projectId);
      if (project && user) {
        project.users.push(user);
        project.isShared = true;
        project.cases.casesComments.forEach((_cc) => {
          _cc.notifyInfo[user.id] = { status: 'read' };
        });
        await this.pAServ.setData(project).then((_project) => {
          projectResult = _project;
        });
        if (projectResult) {
          await this.servUser
            .getUsersByProjectIds([projectResult.id])
            .then((_items) => {
              _items.forEach((_item: IUser) => {
                if (_item.id !== payload.userId) {
                  if (shareUsers[_item.id]) { /* Юзер уже записан */
                    const _projects = shareUsers[_item.id].projects;
                    _projects.push(_item.project_id);
                    shareUsers[_item.id].projects = _projects;
                  } else {
                    shareUsers[_item.id] = {
                      id: _item.id,
                      fullName: _item.fullName,
                      projects: [_item.project_id],
                    };
                  }
                }
              });
            });
        }
        console.log('USER --------->', user.id);
        console.log('projectResult', projectResult);
        console.log('shareUsers', shareUsers);
        return {
          project: projectResult,
          shareUsers,
        };
      }
      return {};
    }
    return {};
  }

  @UseGuards(JwtAuthGuard)
  @Post('add-project')
  public async addProject(@Body() payload: IProject) {
    if (payload.userId) {
      const user = await this.servUser.getUserById(payload.userId);
      payload.users = [user];
    }
    const projectObj = await this.pAServ.addProject(payload);
    const users = projectObj.users.map((_user) => {
      delete _user.password;
      delete _user.salt;
      return _user;
    });
    projectObj.users = users;
    return projectObj;
  }

  @UseGuards(JwtAuthGuard)
  @Post('update-simple-project-info')
  public async updateSimpleProjectInfo(@Body() payload: ISimpleProjectsInfo) {
    return await this.pAServ.updateSimpleProjectInfo(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Post('add-slide')
  public async setSlideData(
    @Body() payload: { projectId: number; slideData: any },
  ) {
    return await this.pAServ.setSlideData(payload).then(() => {
      const emitter = this.appService.getEmitter();
      emitter.emit('event');
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('add-case')
  public async setCaseData(
    @Body() payload: { projectId: number; caseData: any },
  ) {
    return await this.pAServ.setCaseData(payload).then(() => {
      console.log(3333333);
      const emitter = this.appService.getEmitter();
      emitter.emit('event');
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload-slide-img')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadSlideImg(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { userId: number; projectId: number; slideId: number },
  ) {
    // const userId = body.userId;
    const projectId = body.projectId;
    const slideId = body.slideId;
    const path = `project_${projectId}/slide_${slideId}/`;
    const dir = `uploads/${path}`;
    const filename = customFileName(file);
    fs.mkdirSync('./' + dir, { recursive: true });
    fs.writeFile(
      './' + dir + filename,
      file.buffer,
      'binary',
      function (err) {},
    );
    return await this.pAServ.setImage(projectId, slideId, path + filename);
  }
}
