import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedDefaultSiteSettings1769874134486 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {


        // Insert default Contact
        await queryRunner.query(`
                INSERT INTO contact (email, phone, address, "updatedAt")
                VALUES (
                    'contact@example.com',
                    '+1 (555) 000-0000',
                    '123 Main Street, City, State 12345',
                    CURRENT_TIMESTAMP
                )
                ON CONFLICT DO NOTHING
            `);

        // Insert default Location
        await queryRunner.query(`
                INSERT INTO location (title, subtitle, "mapUrl", "buttonText", "updatedAt")
                VALUES (
                    'Find Us Here',
                    'Visit our location for the best experience',
                    'https://maps.google.com',
                    'Get Directions',
                    CURRENT_TIMESTAMP
                )
                ON CONFLICT DO NOTHING
            `);

        // Insert default Stats
        await queryRunner.query(`
                INSERT INTO stats (title, "updatedAt")
                VALUES (
                    'Our Achievements',
                    CURRENT_TIMESTAMP
                )
                ON CONFLICT DO NOTHING
            `);

        // Insert default Menu Section
        await queryRunner.query(`
                INSERT INTO menu_section (title, "buttonText", "updatedAt")
                VALUES (
                    'Our Menu',
                    'View Full Menu',
                    CURRENT_TIMESTAMP
                )
                ON CONFLICT DO NOTHING
            `);

        // Insert default Why Choose Us
        await queryRunner.query(`
                INSERT INTO why_choose_us (
                    title, 
                    subtitle, 
                    image, 
                    "contentParagraph1", 
                    "contentParagraph2",
                    "updatedAt"
                )
                VALUES (
                    'Why Choose Us',
                    'What makes us different',
                    'https://via.placeholder.com/600x400',
                    'We are committed to providing the best service possible. Our team works tirelessly to ensure your satisfaction.',
                    'With years of experience and a passion for excellence, we deliver results that exceed expectations.',
                    CURRENT_TIMESTAMP
                )
                ON CONFLICT DO NOTHING
            `);

        // Insert default Newsletter
        await queryRunner.query(`
                INSERT INTO newsletter (
                    title, 
                    placeholder, 
                    "buttonText",
                    "backgroundImage",
                    "updatedAt"
                )
                VALUES (
                    'Subscribe to Our Newsletter',
                    'Enter your email address',
                    'Subscribe',
                    'https://via.placeholder.com/1200x400',
                    CURRENT_TIMESTAMP
                )
                ON CONFLICT DO NOTHING
            `);

        // Insert default Testimonials
        await queryRunner.query(`
                INSERT INTO testimonials (title, "updatedAt")
                VALUES (
                    'What Our Customers Say',
                    CURRENT_TIMESTAMP
                )
                ON CONFLICT DO NOTHING
            `);

        // Insert default Footer
        await queryRunner.query(`
                INSERT INTO footer (
                    "productsTitle",
                    "legalTitle",
                    "contactTitle",
                    "acceptTitle",
                    "updatedAt"
                )
                VALUES (
                    'Products',
                    'Legal',
                    'Contact Us',
                    'We Accept',
                    CURRENT_TIMESTAMP
                )
                ON CONFLICT DO NOTHING
            `);

        // Insert default Announcement
        await queryRunner.query(`
                INSERT INTO announcement (
                    "isActive",
                    title,
                    description,
                    image,
                    "buttonText",
                    "buttonLink",
                    "updatedAt"
                )
                VALUES (
                    false,
                    'Welcome!',
                    'Welcome to our website! Check out our latest offers.',
                    'https://via.placeholder.com/800x200',
                    'Learn More',
                    '#',
                    CURRENT_TIMESTAMP
                )
                ON CONFLICT DO NOTHING
            `);

        // Insert default Theme
        await queryRunner.query(`
                INSERT INTO theme (
                    "primaryColor",
                    "secondaryColor",
                    "backgroundColor",
                    "textColor",
                    "updatedAt"
                )
                VALUES (
                    '#f97316',
                    '#111111',
                    '#000000',
                    '#ffffff',
                    CURRENT_TIMESTAMP
                )
                ON CONFLICT DO NOTHING
            `);

        // Insert default Dashboard Hero (if this entity exists)
        await queryRunner.query(`
                INSERT INTO dashboard_hero (
                    title,
                    "subTitle",
                    "buttonText",
                    "backgroundImage",
                    "updatedAt"
                )
                VALUES (
                    'Welcome to Your Dashboard',
                    'Manage your business with ease',
                    'Get Started',
                    'https://via.placeholder.com/1920x600',
                    CURRENT_TIMESTAMP
                )
                ON CONFLICT DO NOTHING
            `);

        // Insert default Dashboard Branding (if this entity exists - note table name might be different)
        await queryRunner.query(`
                INSERT INTO dashboard_branding (
                    name,
                    "logo_url",
                    "updatedAt"
                )
                VALUES (
                    'Your Company',
                    'https://via.placeholder.com/200x60',
                    CURRENT_TIMESTAMP
                )
                ON CONFLICT DO NOTHING
            `);

        // Insert default Nav Items
        const navItems = [
            { name: 'Home', link: '/', order: 1 },
            { name: 'About', link: '/about', order: 2 },
            { name: 'Menu', link: '/menu', order: 3 },
            { name: 'Contact', link: '/contact', order: 4 },
        ];

        for (const item of navItems) {
            await queryRunner.query(`
                    INSERT INTO nav_items (name, link, "order", "isActive",  "updatedAt")
                    VALUES (
                        '${item.name}',
                        '${item.link}',
                        ${item.order},
                        true,
                        CURRENT_TIMESTAMP
                    )
                    ON CONFLICT DO NOTHING
                `);
        }

        // Insert default Footer Product Links
        const productLinks = [
            { name: 'Product 1', link: '/product-1', order: 1 },
            { name: 'Product 2', link: '/product-2', order: 2 },
            { name: 'Product 3', link: '/product-3', order: 3 },
        ];

        for (const link of productLinks) {
            await queryRunner.query(`
                    INSERT INTO footer_product_links (name, link, "order")
                    VALUES (
                        '${link.name}',
                        '${link.link}',
                        ${link.order}
                    )
                    ON CONFLICT DO NOTHING
                `);
        }

        // Insert default Footer Legal Links
        const legalLinks = [
            { name: 'Privacy Policy', link: '/privacy', order: 1 },
            { name: 'Terms of Service', link: '/terms', order: 2 },
            { name: 'Cookie Policy', link: '/cookies', order: 3 },
        ];

        for (const link of legalLinks) {
            await queryRunner.query(`
                    INSERT INTO footer_legal_links (name, link, "order")
                    VALUES (
                        '${link.name}',
                        '${link.link}',
                        ${link.order}
                    )
                    ON CONFLICT DO NOTHING
                `);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> { }
}

