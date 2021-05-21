import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CommunityReadiness, CommunityServiceInfo, CommunitySubscribe } from '../../model/community.entity';

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

abstract class BrowserClientInfo {
  @ApiProperty({ required: true })
  @IsNumber()
  id: number;

  @ApiProperty({ required: false })
  @IsString()
  userIp: string;

  @ApiProperty({ required: false })
  @IsString()
  userDevice: string;

  @ApiProperty({ required: false })
  @IsString()
  userAgent: string;

  protected static _from = (it, dto) => {
    it.userIp = dto.userIp ? dto.userIp : '';
    it.userDevice = dto.userDevice ? dto.userDevice : '';
    it.userAgent = dto.userAgent ? dto.userAgent : '';
    return it;
  };

  protected static _fromEntity = (entity) => {
    return {
      userIp: entity.userIp ? entity.userIp : '',
      userDevice: entity.userDevice ? entity.userDevice : '',
      userAgent: entity.userAgent ? entity.userAgent : '',
    };
  }
}

export class CommunitySubscribeDTO
  extends BrowserClientInfo
  implements Readonly<CommunitySubscribeDTO> {
  @ApiProperty({ required: true })
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  tariff: string;

  @ApiProperty({ required: true })
  @IsString()
  lang: string;

  public static from(dto: Partial<CommunitySubscribeDTO>) {
    const it = new CommunitySubscribeDTO();
    it.id = dto.id;
    it.name = dto.name;
    it.email = dto.email;
    it.tariff = dto.tariff;
    it.lang = dto.lang;
    return CommunitySubscribeDTO._from(it, dto);
  }

  public static fromEntity(entity: CommunitySubscribe) {
    return this.from(Object.assign({}, {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      tariff: entity.tariff,
    }, CommunitySubscribeDTO._fromEntity(entity)));
  }

  public toEntity() {
    const it = new CommunitySubscribe();
    it.id = this.id;
    it.name = this.name;
    it.email = this.email;
    it.tariff = this.tariff;
    return CommunitySubscribeDTO._from(it, this);
  }
}

export class CommunityReadinessDTO
  extends BrowserClientInfo
  implements Readonly<CommunityReadinessDTO> {
  @ApiProperty({ required: true })
  @IsString()
  email: string;

  public static from(dto: Partial<CommunityReadinessDTO>) {
    const it = new CommunityReadinessDTO();
    it.id = dto.id;
    it.email = dto.email;
    return CommunityReadinessDTO._from(it, dto);
  }

  public static fromEntity(entity: CommunityReadiness) {
    return this.from(Object.assign({}, {
      id: entity.id,
      email: entity.email,
    }, CommunityReadinessDTO._fromEntity(entity)));
  }

  public toEntity() {
    const it = new CommunityReadiness();
    it.id = this.id;
    it.email = this.email;
    return CommunityReadinessDTO._from(it, this);
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