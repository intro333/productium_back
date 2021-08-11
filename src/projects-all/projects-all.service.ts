import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectEntity } from '../model/projects.entity';
import {
  IProject,
  ISimpleProjectsInfo,
} from '../interfaces/projects.interface';

@Injectable()
export class ProjectsAllService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly repo: Repository<ProjectEntity>,
  ) {}

  // public async getUsersByProjectId(projectId: number): Promise<IUser> {
  //   return await this.repo.save(payload);
  // }

  public async setData(payload: IProject): Promise<ProjectEntity> {
    return await this.repo.save(payload);
  }

  public async getProjectById(id: number): Promise<ProjectEntity> {
    return await this.repo.findOne({
      where: {
        id,
      },
      relations: ['users'],
    });
  }

  public async getProjectsByUserId(payload: {
    userId: number;
  }): Promise<ProjectEntity[]> {
    return await this.repo
      .createQueryBuilder('projects')
      .leftJoinAndSelect('projects.users', 'user')
      .where('user.id = :id', { id: payload.userId })
      .getMany();
  }

  public async getProjectsByUserIds(
    userIds: number[],
  ): Promise<ProjectEntity[]> {
    let query = await this.repo
      .createQueryBuilder('projects')
      .leftJoin('projects.users', 'user');
    userIds.forEach((_id, i) => {
      if (i === 0) {
        query = query.where('user.id = :id', { id: _id });
      } else {
        query = query.orWhere('user.id = :id', { id: _id });
      }
    });
    return query.getMany();
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

  public async addProject(payload: IProject): Promise<ProjectEntity> {
    return await this.repo.save(payload);
  }

  public async setSlideData(payload: { projectId: number; slideData: any }) {
    const record = this.repo.findOne(payload.projectId);
    record.then((_r) => {
      _r.slides = payload.slideData;
      return this.repo.save(_r);
    });
    return {};
  }

  public async setCaseData(payload: { projectId: number; caseData: any }) {
    const record = this.repo.findOne(payload.projectId);
    console.log(1111);
    await record.then((_r) => {
      _r.cases = payload.caseData;
      console.log(222222);
      return this.repo.save(_r);
    });
  }

  public async setImage(projectId, slideId, imagePath) {
    console.log('imagePath', imagePath);
    const result = await this.repo
      .findOne(projectId)
      .then(async (item) => item);
    const slides = result.slides.slides;
    const foundSlide = slides.find((_sl) => _sl.id === slideId);
    console.log('foundSlide', foundSlide);
    console.log('imagePath', imagePath);
    if (foundSlide) {
      foundSlide.img = true;
      foundSlide.imgUrl = imagePath;
    }
    result.slides.slides = slides;
    await this.repo.save(result);
    return foundSlide;
  }
}
