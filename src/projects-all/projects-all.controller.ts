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

@Controller('api/projects-all')
export class ProjectsAllController {
  constructor(
    private pAServ: ProjectsAllService,
    private servUser: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('')
  public async getInitData(@Body() payload: { userId: number }) {
    let projects: ProjectEntity[] = [];
    const projectIds: number[] = [];
    const shareUsers: User[] = [];
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
      _items.forEach((_item) => {
        if (_item.id !== payload.userId) {
          delete _item.password;
          delete _item.salt;
          shareUsers.push(_item);
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
    console.log('SHARE PROJECT');
    if (payload.userId && payload.projectId) {
      const user = await this.servUser.getUserById(payload.userId);
      const project = await this.pAServ.getProjectById(payload.projectId);
      if (project && user) {
        project.users.push(user);
        project.isShared = true;
        return await this.pAServ.setData(project);
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
    @Body() payload: { userId: number; projectId: number; slideData: any },
  ) {
    return await this.pAServ.setSlideData(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Post('add-case')
  public async setCaseData(
    @Body() payload: { projectId: number; caseData: any },
  ) {
    return await this.pAServ.setCaseData(payload);
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
