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
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}