import { Controller, Post, Body } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityServiceInfoDTO, CommunitySubscribeDTO } from '../scripts/swagger/community.dto';

@Controller('api/community')
export class CommunityController {
  constructor(private serv: CommunityService) { }

  @Post('init')
  public async getInitData(): Promise<CommunityServiceInfoDTO | null> {
    return await this.serv.getInitData();
  }

  @Post('subscribe')
  public async subscribe(@Body() data: CommunitySubscribeDTO): Promise<CommunitySubscribeDTO> {
    const dto = CommunitySubscribeDTO.from(data);
    return await this.serv.subscribe(dto);
  }
}
