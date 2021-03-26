import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityService } from './community.service';
import { CmailerService } from '../mailer/cmailer.service';
import { CommunityController } from './community.controller';
import { CommunityReadiness, CommunityServiceInfo, CommunitySubscribe } from '../model/community.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommunityServiceInfo,
      CommunitySubscribe,
      CommunityReadiness,
    ]),
  ],
  providers: [CommunityService, CmailerService],
  controllers: [CommunityController],
  exports: [],
})
export class CommunityModule {}
