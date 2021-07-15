import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectsAllEntity } from '../model/projectsAll.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IProjectsAll, IProjectsInfo } from '../interfaces/projects_all.interface';

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

  public async updateProjectInfo(payload: IProjectsInfo) {
    const record = this.repo.findOne({ userId: payload.userId });
    record.then((_r) => {
      _r.projects = payload.projectData;
      return this.repo.save(_r);
    });
    return {};
  }

  public async setSlideData(payload: { userId: number; slideData: any }) {
    const record = this.repo.findOne({ userId: payload.userId });
    record.then((_r) => {
      _r.slides = payload.slideData;
      return this.repo.save(_r);
    });
    return {};
  }

  public async setCaseData(payload: { userId: number; caseData: any }) {
    const record = this.repo.findOne({ userId: payload.userId });
    record.then((_r) => {
      _r.cases = payload.caseData;
      return this.repo.save(_r);
    });
    return {};
  }

  public async setImage(userId, slideId, imagePath) {
    const result = await this.repo
      .findOne({ userId: userId })
      .then(async (item) => item);
    const slides = result.slides.slides;
    const foundSlide = slides.find((_sl) => _sl.id === parseInt(slideId));
    if (foundSlide) {
      foundSlide.img = true;
      foundSlide.imgUrl = imagePath;
    }
    console.log('foundSlide', foundSlide);
    console.log('slides', slides);
    result.slides.slides = slides;
    await this.repo.save(result);
    return foundSlide;
  }
}
