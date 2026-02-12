import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity("contact")
export class DashboardContact {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    address: string;

    @UpdateDateColumn()
    updatedAt: Date;

}