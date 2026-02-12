import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';


@Entity('stats')
export class Stats {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}



@Entity('stat_items')
export class StatItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @Column()
  label: string;

  @Column({ default: 1 })
  order: number;


  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
