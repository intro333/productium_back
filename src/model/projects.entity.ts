import { IProject } from 'src/interfaces/projects.interface';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'projects' })
export class ProjectEntity implements IProject {
  @PrimaryGeneratedColumn('increment') id: number;
  @Column({ type: 'varchar', length: 50 }) name: string;
  @Column({ type: 'varchar', length: 50 }) activityStatus: string;
  @Column({ type: 'json' }) slides: any;
  @Column({ type: 'json' }) cases: any;
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }) createdAt: Date;
  @ManyToMany(() => User) @JoinTable() users: User[];
}
