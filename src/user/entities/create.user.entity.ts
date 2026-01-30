import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserSession } from './user.session.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: false,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 30,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    default: 'pending',
  })
  status: string;

  @Column({
    length: 150,
  })
  password: string;

  @Column({
    default: 'user',
  })
  role: string;

  @Column({
    length: 150,
    nullable: true,
  })
  avatarUrl?: string;

  @Column({
    default: 'UTC',
    nullable: true,
  })
  timezone?: string;

  @OneToMany(() => UserSession, (session) => session.user)
  sessions?: UserSession[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
