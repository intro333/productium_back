import { IProjectsAll } from 'src/interfaces/projects_all.interface';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: 'projects_all' })
export class ProjectsAllEntity implements IProjectsAll {
  @PrimaryGeneratedColumn('increment') id: number;
  @Column({ type: 'json' }) projects: { key: string };
  @Column({ type: 'json' }) slides: { key: string };
  @Column({ type: 'json' }) cases: { key: string };
  @Column({ type: 'int' }) userId: number;
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }) createdAt: Date;
}
