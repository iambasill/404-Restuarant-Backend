import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity("dashboard_hero")
export class DashboardHero {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    subTitle: string;

    @Column()
    buttonText: string

    @Column()
    backgroundImage: string


    @UpdateDateColumn()
    updatedAt: Date;
}