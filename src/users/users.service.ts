import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../model/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async createUser(payload: User): Promise<User | undefined> {
    return await this.repo.save(payload);
  }

  async getUserById(userId: number): Promise<User | undefined> {
    return await this.repo.findOne(userId);
  }

  async getUserByIds(userIds: number[]): Promise<User[]> {
    return this.repo
      .createQueryBuilder('users')
      .whereInIds(userIds)
      .getMany();
  }

  async getUsersByProjectIds(projectIds: number[]): Promise<User[]> {
    let query = this.repo
      .createQueryBuilder('users')
      .leftJoin('users.projects', 'project');
    projectIds.forEach((_id, i) => {
      if (i === 0) {
        query = query.where('project.id = :id', { id: _id });
      } else {
        query = query.orWhere('project.id = :id', { id: _id });
      }
    });
    return query.getMany();
  }

  // async findOne(username: string): Promise<User | undefined> {
  //   return this.users.find((user) => user.username === username);
  // }
}
