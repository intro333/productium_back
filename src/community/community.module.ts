import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';
import { CommunityServiceInfo } from '../model/community.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommunityServiceInfo])],
  providers: [CommunityService],
  controllers: [CommunityController],
  exports: [],
})
export class CommunityModule {}
