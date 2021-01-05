import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommunityReadiness, CommunityServiceInfo, CommunitySubscribe } from '../model/community.entity';
import { Repository } from 'typeorm';
import {
  CommunityReadinessDTO,
  CommunityServiceInfoDTO,
  CommunitySubscribeDTO,
} from '../scripts/swagger/community.dto';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(CommunityServiceInfo) private readonly repo: Repository<CommunityServiceInfo>,
    @InjectRepository(CommunitySubscribe) private readonly repoSubscribe: Repository<CommunitySubscribe>,
    @InjectRepository(CommunityReadiness) private readonly repoReadiness: Repository<CommunityReadiness>,
  ) { }

  public async getInitData(): Promise<CommunityServiceInfoDTO | null> {
    return await this.repo
      .findOne(1)
      .then(async (item) => CommunityServiceInfoDTO.fromEntity(item));
  }

  public async create(
    dto: CommunityServiceInfoDTO,
  ): Promise<CommunityServiceInfoDTO> {
    return this.repo.save(dto.toEntity())
      .then((e) => CommunityServiceInfoDTO.fromEntity(e));
  }

  public async subscribe(
    dto: CommunitySubscribeDTO,
  ): Promise<CommunitySubscribeDTO> {
    return this.repoSubscribe.save(dto.toEntity())
      .then((e) => CommunitySubscribeDTO.fromEntity(e))
      .catch((error) => {
        console.log('LOGGING. subscribe error: ', error);
        let errorMessage = 'failed_to_create_record';
        if (error && error.code === '23505') {
          errorMessage = 'unique_violation'; // https://www.postgresql.org/docs/9.2/errcodes-appendix.html
        }
        throw new HttpException({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            errorMessage,
        }, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  public async readiness(
    dto: CommunityReadinessDTO,
  ): Promise<CommunityReadinessDTO> {
    return this.repoReadiness.save(dto.toEntity())
      .then((e) => CommunityReadinessDTO.fromEntity(e))
      .catch((error) => {
        console.log('LOGGING. readiness error: ', error);
        let errorMessage = 'failed_to_create_record';
        if (error && error.code === '23505') {
          errorMessage = 'unique_violation'; // https://www.postgresql.org/docs/9.2/errcodes-appendix.html
        }
        throw new HttpException({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            errorMessage,
        }, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
}
