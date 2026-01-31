import { User } from 'src/user/entities/create.user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('organizations')
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true, nullable: true })
  slug: string; // URL-friendly name

  @Column('text', { nullable: true })
  description: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  primaryEmail: string;

  @Column({ nullable: true })
  primaryPhone: string;

  @Column('text', { nullable: true })
  address: string;

  // Business settings
  @Column({ default: 'active' }) // active, inactive, suspended
  status: string;

  @Column({ type: 'varchar', length: 10, default: 'USD' })
  currency: string;

  @Column({ default: 'UTC' })
  timezone: string;

  // Subscription/Plan info (optional for future use)
  @Column({ nullable: true })
  plan: string; // 'free', 'basic', 'premium'

  @Column({ type: 'timestamp', nullable: true })
  subscriptionExpiresAt: Date;

  // Relations
  @OneToMany(() => User, (user) => user.organization)
  users: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}




