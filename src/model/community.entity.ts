// import { ICommunityServiceInfo } from 'src/interfaces/community.interface';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'community_service_info' })
export class CommunityServiceInfo {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'smallint' })
  readyPercent: number;

  @Column({ type: 'smallint' })
  membersCount: number;
}