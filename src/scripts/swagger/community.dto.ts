import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CommunityServiceInfo, CommunitySubscribe } from '../../model/community.entity';

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

export class CommunitySubscribeDTO implements Readonly<CommunitySubscribeDTO> {
  @ApiProperty({ required: true })
  @IsNumber()
  id: number;

  @ApiProperty({ required: true })
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  tariff: string;

  @ApiProperty({ required: false })
  @IsString()
  userIp: string;

  @ApiProperty({ required: false })
  @IsString()
  userDevice: string;

  @ApiProperty({ required: false })
  @IsString()
  userAgent: string;

  public static from(dto: Partial<CommunitySubscribeDTO>) {
    const it = new CommunitySubscribeDTO();
    it.id = dto.id;
    it.name = dto.name;
    it.email = dto.email;
    it.tariff = dto.tariff;
    it.userIp = dto.userIp;
    it.userDevice = dto.userDevice;
    it.userAgent = dto.userAgent;
    return it;
  }

  public static fromEntity(entity: CommunitySubscribe) {
    return this.from({
      id: entity.id,
      name: entity.name,
      email: entity.email,
      tariff: entity.tariff,
      userIp: entity.userIp,
      userDevice: entity.userDevice,
      userAgent: entity.userAgent,
    });
  }

  public toEntity() {
    const it = new CommunitySubscribe();
    it.id = this.id;
    it.name = this.name;
    it.email = this.email;
    it.tariff = this.tariff;
    it.userIp = this.userIp;
    it.userDevice = this.userDevice;
    it.userAgent = this.userAgent;
    return it;
  }
}

export class CommunityErrorHandlerDTO implements Readonly<CommunityErrorHandlerDTO> {
  @ApiProperty({ required: true })
  @IsString()
  message: string;

  public static fromError(error: any) {
    return error;
  }
}