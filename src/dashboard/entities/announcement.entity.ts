import { Organization } from 'src/organization/entities/organisation.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';



@Entity('announcement')
export class Announcement {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: false })
    isActive: boolean;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column({ nullable: true })
    image: string;

    @Column()
    buttonText: string;

    @Column()
    buttonLink: string;

    @ManyToOne(() => Organization, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'organizationId' })
    organization: Organization;

    @Column({ type: 'uuid' })
    organizationId: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
