import { Express } from 'express';
import {
  Controller,
  Post,
  Body,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectsAllService } from './projects-all.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IProject, ISimpleProjectsInfo } from '../interfaces/projects.interface';
import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { Helper } from '../shared/helper';
import * as fs from 'fs';
import { customFileName } from '../shared/helper';
import { UsersService } from '../users/users.service';

@Controller('api/projects-all')
export class ProjectsAllController {
  constructor(
    private pAServ: ProjectsAllService,
    private servUser: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  public async getInitData(@Body() payload: { userId: number }) {
    return await this.pAServ.getInitData(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Post('set-data')
  public async setData(@Body() payload: IProject) {
    if (payload.userId) {
      const user = await this.servUser.getUserById(payload.userId);
      payload.users = [user];
    }
    return await this.pAServ.setData(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Post('add-project')
  public async addProject(@Body() payload: IProject) {
    if (payload.userId) {
      const user = await this.servUser.getUserById(payload.userId);
      payload.users = [user];
    }
    return await this.pAServ.addProject(payload);
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
  public async setCaseData(@Body() payload: { projectId: number; caseData: any }) {
    return await this.pAServ.setCaseData(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload-slide-img')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadSlideImg(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { userId: number; projectId: number; slideId: number },
  ) {
    const userId = body.userId;
    const projectId = body.projectId;
    const slideId = body.slideId;
    const path = `user_${userId}/project_${projectId}/slide_${slideId}/`;
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
