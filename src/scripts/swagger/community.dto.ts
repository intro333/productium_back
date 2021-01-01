import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CommunityServiceInfo } from '../../model/community.entity';

export class CommunityServiceInfoDTO implements Readonly<CommunityServiceInfoDTO> {
  @ApiProperty({ required: true })
  @IsNumber()
  id: number;

  @ApiProperty({ required: true })
  @IsNumber()
  readyPercent: number;

  @ApiProperty({ required: true })
  @IsNumber()
  membersCount: number;

  public static from(dto: Partial<CommunityServiceInfoDTO>) {
    const it = new CommunityServiceInfoDTO();
    it.id = dto.id;
    it.readyPercent = dto.readyPercent;
    it.membersCount = dto.membersCount;
    return it;
  }

  public static fromEntity(entity: CommunityServiceInfo) {
    return entity ? this.from({
      id: entity.id,
      readyPercent: entity.readyPercent,
      membersCount: entity.membersCount
    }) : null;
  }

  public toEntity() {
    const it = new CommunityServiceInfo();
    it.id = this.id;
    it.readyPercent = this.readyPercent;
    it.membersCount = this.membersCount;
    return it;
  }
}