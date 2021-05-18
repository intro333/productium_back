import { IUser } from 'src/interfaces/user.interface';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User implements IUser {
  @PrimaryGeneratedColumn('increment') id: number;
  @Column({ type: 'varchar', length: 100 }) fullName: string;
  @Column({ type: 'varchar', length: 200 }) password: string;
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }) createdAt: Date;
}
