import { IUser } from 'src/interfaces/user.interface';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ProjectEntity } from './projects.entity';

@Entity({ name: 'users' })
export class User implements IUser {
  @PrimaryGeneratedColumn('increment') id: number;
  @Column({ type: 'varchar', length: 100 }) fullName: string;
  @Exclude() @Column({ type: 'varchar', length: 200 }) password: string;
  @Exclude() @Column({ type: 'varchar', length: 200 }) salt: string;
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }) createdAt: Date;
  @ManyToMany(() => ProjectEntity, (project) => project.users, { eager: false })
  projects: ProjectEntity[];
}
