import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';


@Entity('footer')
export class Footer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productsTitle: string;

    @Column()
    legalTitle: string;

    @Column()
    contactTitle: string;

    @Column()
    acceptTitle: string;



    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}

@Entity('footer_product_links')
export class FooterProductLink {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    link: string;

    @Column({ default: 1 })
    order: number;


}

@Entity('footer_legal_links')
export class FooterLegalLink {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    link: string;
    
    @Column({ default: 1 })
    order: number;

}