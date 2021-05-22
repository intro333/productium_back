import { IProjectsAll } from 'src/interfaces/projects_all.interface';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: 'projects_all' })
export class ProjectsAllEntity implements IProjectsAll {
  @PrimaryGeneratedColumn('increment') id: number;
  @Column({ type: 'json' }) projects: any;
  @Column({ type: 'json' }) slides: any;
  @Column({ type: 'json' }) cases: any;
  @Column({ type: 'int' }) userId: number;
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }) createdAt: Date;
}
