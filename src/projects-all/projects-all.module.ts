import { Module } from '@nestjs/common';
import { ProjectsAllController } from './projects-all.controller';
import { ProjectsAllService } from './projects-all.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from '../model/projects.entity';
import { UsersModule } from '../users/users.module';
import { AppService } from '../app.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectEntity
    ]),
    UsersModule
  ],
  controllers: [ProjectsAllController],
  providers: [ProjectsAllService, AppService],
  exports: [ProjectsAllService],
})
export class ProjectsAllModule {}
