import { Controller, Post } from '@nestjs/common';
import { CommunityServiceInfoDTO } from 'src/scripts/swagger/community.dto';
import { CommunityService } from './community.service';

@Controller('api/community')
export class CommunityController {
  constructor(private serv: CommunityService) { }

  @Post('init')
  public async getInitData(): Promise<CommunityServiceInfoDTO | null> {
    return await this.serv.getInitData();
  }
}
