import { ICommunityReadiness, ICommunityServiceInfo, ICommunitySubscribe } from 'src/interfaces/community.interface';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export abstract class BaseCommunityEntity {
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }) createdAt: Date;
  @Column({ type: 'varchar', length: 20 }) userIp: string;
  @Column({ type: 'varchar', length: 50 }) userDevice: string;
  @Column({ type: 'varchar', length: 150 }) userAgent: string;
}

@Entity({ name: 'community_service_info' })
export class CommunityServiceInfo implements ICommunityServiceInfo {
  @PrimaryGeneratedColumn('increment') id: number;
  @Column({ type: 'smallint' }) readyPercent: number;
  @Column({ type: 'smallint' }) membersCount: number;
}

@Entity({ name: 'community_subscribe' })
export class CommunitySubscribe extends BaseCommunityEntity implements ICommunitySubscribe {
  @PrimaryGeneratedColumn('increment') id: number;
  @Column({ type: 'varchar', length: 50 }) name: string;
  @Column({ type: 'varchar', length: 50, unique: true }) email: string;
  @Column({ type: 'varchar', length: 20 }) tariff: string;
}

@Entity({ name: 'community_readiness' })
export class CommunityReadiness extends BaseCommunityEntity implements ICommunityReadiness {
  @PrimaryGeneratedColumn('increment') id: number;
  @Column({ type: 'varchar', length: 50, unique: true }) email: string;
}