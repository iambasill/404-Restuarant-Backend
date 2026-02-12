import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('testimonials')
export class Testimonials {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}

@Entity('testimonial_items')
export class TestimonialItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    title: string;

    @Column({ type: 'int', default: 5 })
    rating: number;

    @Column('text')
    text: string;

    @Column()
    image: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: 1 })
    order: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
