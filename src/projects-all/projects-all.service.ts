import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectsAllEntity } from '../model/projectsAll.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IProjectsAll } from '../interfaces/projects_all.interface';

@Injectable()
export class ProjectsAllService {
  constructor(
    @InjectRepository(ProjectsAllEntity)
    private readonly repo: Repository<ProjectsAllEntity>,
  ) {}

  public async getInitData(payload: { userId: number }) {
    return await this.repo
      .findOne({ userId: payload.userId })
      .then(async (item) => item);
  }

  public async setData(payload: IProjectsAll) {
    return await this.repo.save(payload);
  }
}
