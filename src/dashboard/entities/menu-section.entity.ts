import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';



@Entity('menu_section')
export class MenuSection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  buttonText: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}