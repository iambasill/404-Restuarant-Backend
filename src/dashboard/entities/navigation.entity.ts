import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('nav_items')
export class NavItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    link: string;

    @Column({ default: 1 })
    order: number;


    @Column({ default: true })
    isActive: boolean;


    @UpdateDateColumn()
    updatedAt: Date;
}
