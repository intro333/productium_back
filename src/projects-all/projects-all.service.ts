import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectEntity } from '../model/projects.entity';
import { IProject, ISimpleProjectsInfo } from '../interfaces/projects.interface';

@Injectable()
export class ProjectsAllService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly repo: Repository<ProjectEntity>,
  ) {}

  /* Все проекты пользователя */
  public async getInitData(payload: { userId: number }) {
    return this.repo
      .createQueryBuilder('projects')
      .leftJoinAndSelect(
        'projects.users',
        'user',)
      .where('user.id = :id', { id: payload.userId })
      .getMany();
  }

  public async setData(payload: IProject) {
    return await this.repo.save(payload);
  }

  public async updateSimpleProjectInfo(payload: ISimpleProjectsInfo) {
    const project = payload.project;
    const record = this.repo.findOne(project.id);
    record.then((_r) => {
      _r.name = project.name;
      _r.activityStatus = project.activityStatus;
      return this.repo.save(_r);
    });
    return {};
  }

  public async addProject(payload: IProject) {
    return await this.repo.save(payload);
  }

  public async setSlideData(payload: {
    userId: number;
    projectId: number;
    slideData: any;
  }) {
    const record = this.repo.findOne(payload.projectId);
    record.then((_r) => {
      _r.slides = payload.slideData;
      return this.repo.save(_r);
    });
    return {};
  }

  public async setCaseData(payload: { projectId: number; caseData: any }) {
    const record = this.repo.findOne(payload.projectId);
    record.then((_r) => {
      _r.cases = payload.caseData;
      return this.repo.save(_r);
    });
    return {};
  }

  public async setImage(projectId, slideId, imagePath) {
    const result = await this.repo
      .findOne(projectId)
      .then(async (item) => item);
    const slides = result.slides.slides;
    const foundSlide = slides.find((_sl) => _sl.id === parseInt(slideId));
    if (foundSlide) {
      foundSlide.img = true;
      foundSlide.imgUrl = imagePath;
    }
    result.slides.slides = slides;
    await this.repo.save(result);
    return foundSlide;
  }
}
