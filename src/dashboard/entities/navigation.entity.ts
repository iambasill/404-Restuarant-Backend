import { Organization } from 'src/organization/entities/organisation.entity';
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

    @ManyToOne(() => Organization, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'organizationId' })
    organization: Organization;

    @Column({ type: 'uuid' })
    organizationId: string;

    @UpdateDateColumn()
    updatedAt: Date;
}
