
import { Organization } from 'src/organization/entities/organisation.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('why_choose_us')
export class WhyChooseUs {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    subtitle: string;

    @Column()
    image: string;

    @Column('text')
    contentParagraph1: string;

    @Column('text')
    contentParagraph2: string;
    @ManyToOne(() => Organization, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'organizationId' })
    organization: Organization;

    @Column({ type: 'uuid' })
    organizationId: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}

@Entity('why_choose_us_items')
export class WhyChooseUsItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column({ default: 1 })
    order: number;

    @ManyToOne(() => Organization, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'organizationId' })
    organization: Organization;

    @Column({ type: 'uuid' })
    organizationId: string;
}

@Entity('why_choose_us_checks')
export class WhyChooseUsCheck {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column({ default: 1 })
    order: number;

    @ManyToOne(() => Organization, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'organizationId' })
    organization: Organization;

    @Column({ type: 'uuid' })
    organizationId: string;
}
