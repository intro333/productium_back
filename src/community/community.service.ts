import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommunityServiceInfo } from '../model/community.entity';
import { Repository } from 'typeorm';
import { CommunityServiceInfoDTO } from '../scripts/swagger/community.dto';

@Injectable()
export class CommunityService {
  constructor(@InjectRepository(CommunityServiceInfo) private readonly repo: Repository<CommunityServiceInfo>) { }

  public async getInitData(): Promise<CommunityServiceInfoDTO | null> {
    return await this.repo
      .findOne(1)
      .then(async (item) => CommunityServiceInfoDTO.fromEntity(item));
  }

  public async create(
    dto: CommunityServiceInfoDTO,
  ): Promise<CommunityServiceInfoDTO> {
    return this.repo.save(dto)
      .then((e) => CommunityServiceInfoDTO.fromEntity(e));
  }
}
