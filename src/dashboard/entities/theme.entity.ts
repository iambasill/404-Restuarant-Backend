import { Organization } from 'src/organization/entities/organisation.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('theme')
export class Theme {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '#f97316' })
  primaryColor: string;

  @Column({ default: '#111111' })
  secondaryColor: string;

  @Column({ default: '#000000' })
  backgroundColor: string;

  @Column({ default: '#ffffff' })
  textColor: string;

  @ManyToOne(() => Organization, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'organizationId' })
    organization: Organization;
  
    @Column({ type: 'uuid' })
    organizationId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}