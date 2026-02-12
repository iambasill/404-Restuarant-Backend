import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('newsletter')
export class Newsletter {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    placeholder: string;

    @Column()
    buttonText: string;

    @Column('text')
    backgroundImage: string;



    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}

@Entity('newsletter_subscribers')
export class NewsletterSubscriber {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;


    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    subscribedAt: Date;


    @UpdateDateColumn()
    updatedAt: Date;
}

