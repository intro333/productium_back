import { Module } from '@nestjs/common';
import { ProjectsAllController } from './projects-all.controller';
import { ProjectsAllService } from './projects-all.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsAllEntity } from '../model/projectsAll.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectsAllEntity
    ])
  ],
  controllers: [ProjectsAllController],
  providers: [ProjectsAllService],
})
export class ProjectsAllModule {}
