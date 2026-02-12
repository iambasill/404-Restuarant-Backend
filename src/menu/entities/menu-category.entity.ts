import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MenuItem } from './menu-item.entity';

@Entity('menu_categories')
export class MenuCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ nullable: true })
    slug: string; // For URL-friendly names

    @Column('text', { nullable: true })
    description: string;

    @Column({ nullable: true })
    image: string;

    @Column({ default: 1 })
    order: number;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => MenuItem, (menuItem) => menuItem.category)
    items: MenuItem[];


    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}