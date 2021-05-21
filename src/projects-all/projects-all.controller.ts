import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ProjectsAllService } from './projects-all.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IProjectsAll } from '../interfaces/projects_all.interface';

@Controller('api/projects-all')
export class ProjectsAllController {
  constructor(
    private pAServ: ProjectsAllService
  ) { }

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
}
