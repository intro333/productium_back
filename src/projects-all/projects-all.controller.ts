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
import { IProjectsAll, IProjectsInfo } from '../interfaces/projects_all.interface';
import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { Helper } from '../shared/helper';
import * as fs from 'fs';
import { customFileName } from '../shared/helper';

@Controller('api/projects-all')
export class ProjectsAllController {
  constructor(private pAServ: ProjectsAllService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  public async getInitData(@Body() payload: { userId: number }) {
    return await this.pAServ.getInitData(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Post('set-data')
  public async setData(@Body() payload: IProjectsAll) {
    return await this.pAServ.setData(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update-project-info')
  public async updateProjectInfo(@Body() payload: IProjectsInfo) {
    return await this.pAServ.updateProjectInfo(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Post('add-slide')
  public async setSlideData(
    @Body() payload: { userId: number; slideData: any },
  ) {
    return await this.pAServ.setSlideData(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Post('add-case')
  public async setCaseData(@Body() payload: { userId: number; caseData: any }) {
    return await this.pAServ.setCaseData(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload-slide-img')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadSlideImg(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { userId: number; slideId: number },
  ) {
    const userId = body.userId;
    const slideId = body.slideId;
    const path = `${userId}/slides/${slideId}/`;
    const dir = `uploads/${path}`;
    const filename = customFileName(file);
    fs.mkdirSync('./' + dir, { recursive: true });
    fs.writeFile(
      './' + dir + filename,
      file.buffer,
      'binary',
      function (err) {},
    );
    return await this.pAServ.setImage(userId, slideId, path + filename);
  }
}
