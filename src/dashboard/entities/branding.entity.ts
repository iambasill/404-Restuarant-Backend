import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity("dashboard_branding")
export class DashBoardBranding {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        name: "logo_url"
    })
    logoUrl: string

    @UpdateDateColumn()
    updatedAt: Date;
}