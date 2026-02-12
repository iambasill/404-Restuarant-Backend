import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { MenuCategory } from './menu-category.entity';

@Entity('menu_items')
export class MenuItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    slug: string;

    @Column('text')
    description: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column({ nullable: true })
    image: string;

    @ManyToOne(() => MenuCategory, (category) => category.items, {
        eager: true,
        onDelete: 'SET NULL'
    })
    @JoinColumn({ name: 'categoryId' })
    category: MenuCategory;

    @Column({ nullable: true })
    categoryId: number;

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: true })
    isAvailable: boolean;

    @Column({ default: false })
    isFeatured: boolean;

    @Column({ default: 1 })
    order: number;

    // Optional: Additional fields
    @Column({ nullable: true })
    preparationTime: string; // e.g., "15-20 mins"

    @Column('simple-array', { nullable: true })
    tags: string[]; // e.g., ['spicy', 'vegetarian', 'gluten-free']

    @Column('simple-array', { nullable: true })
    allergens: string[]; // e.g., ['nuts', 'dairy']

    @Column({ type: 'int', default: 0 })
    calories: number;


    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
