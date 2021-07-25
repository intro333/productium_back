import { IProject } from 'src/interfaces/projects.interface';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'projects' })
export class ProjectEntity implements IProject {
  @PrimaryGeneratedColumn('increment') id: number;
  @Column({ type: 'varchar', length: 50 }) name: string;
  @Column({ type: 'varchar', length: 50 }) activityStatus: string;
  @Column({ type: 'bigint' }) creator: number;
  @Column({ type: 'boolean' }) isShared: boolean;
  @Column({ type: 'json' }) slides: any;
  @Column({ type: 'json' }) cases: any;
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @ManyToMany(() => User, (user) => user.projects, { eager: false })
  @JoinTable({
    name: 'project_user',
    joinColumn: { name: 'project_id', referencedColumnName: 'id'},
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id'},
  })
  users: User[];
}
