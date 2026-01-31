import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedDefaultSiteSettings1769874134486 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        const organizations = await queryRunner.query(
            `SELECT id FROM organizations`  
        );

        for (const org of organizations) {
            const orgId = org.id;

            // Insert default Contact
            await queryRunner.query(`
                INSERT INTO contact (email, phone, address, "organizationId", "updatedAt")
                VALUES (
                    'contact@example.com',
                    '+1 (555) 000-0000',
                    '123 Main Street, City, State 12345',
                    '${orgId}',
                    CURRENT_TIMESTAMP
                )
                ON CONFLICT DO NOTHING
            `);

            // Insert default Location
            await queryRunner.query(`
                INSERT INTO location (title, subtitle, "mapUrl", "buttonText", "organizationId", "updatedAt")
                VALUES (
                    'Find Us Here',
                    'Visit our location for the best experience',
                    'https://maps.google.com',
                    'Get Directions',
                    '${orgId}',
                    CURRENT_TIMESTAMP
                )
                ON CONFLICT DO NOTHING
            `);

            // Insert default Stats
            await queryRunner.query(`
                INSERT INTO stats (title, "organizationId", "updatedAt")
                VALUES (
                    'Our Achievements',
                    '${orgId}',
                    CURRENT_TIMESTAMP
                )
                ON CONFLICT DO NOTHING
            `);

            // Insert default Menu Section
            await queryRunner.query(`
                INSERT INTO menu_section (title, "buttonText", "organizationId", "updatedAt")
                VALUES (
                    'Our Menu',
                    'View Full Menu',
                    '${orgId}',
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
                    "organizationId",
                    "updatedAt"
                )
                VALUES (
                    'Why Choose Us',
                    'What makes us different',
                    'https://via.placeholder.com/600x400',
                    'We are committed to providing the best service possible. Our team works tirelessly to ensure your satisfaction.',
                    'With years of experience and a passion for excellence, we deliver results that exceed expectations.',
                    '${orgId}',
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
                    "organizationId",
                    "updatedAt"
                )
                VALUES (
                    'Subscribe to Our Newsletter',
                    'Enter your email address',
                    'Subscribe',
                    'https://via.placeholder.com/1200x400',
                    '${orgId}',
                    CURRENT_TIMESTAMP
                )
                ON CONFLICT DO NOTHING
            `);

            // Insert default Testimonials
            await queryRunner.query(`
                INSERT INTO testimonials (title, "organizationId", "updatedAt")
                VALUES (
                    'What Our Customers Say',
                    '${orgId}',
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
                    "organizationId",
                    "updatedAt"
                )
                VALUES (
                    'Products',
                    'Legal',
                    'Contact Us',
                    'We Accept',
                    '${orgId}',
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
                    "organizationId",
                    "updatedAt"
                )
                VALUES (
                    false,
                    'Welcome!',
                    'Welcome to our website! Check out our latest offers.',
                    'https://via.placeholder.com/800x200',
                    'Learn More',
                    '#',
                    '${orgId}',
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
                    "organizationId",
                    "updatedAt"
                )
                VALUES (
                    '#f97316',
                    '#111111',
                    '#000000',
                    '#ffffff',
                    '${orgId}',
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
                    "organizationId",
                    "updatedAt"
                )
                VALUES (
                    'Welcome to Your Dashboard',
                    'Manage your business with ease',
                    'Get Started',
                    'https://via.placeholder.com/1920x600',
                    '${orgId}',
                    CURRENT_TIMESTAMP
                )
                ON CONFLICT DO NOTHING
            `);

            // Insert default Dashboard Branding (if this entity exists - note table name might be different)
            await queryRunner.query(`
                INSERT INTO dashboard_branding (
                    name,
                    "logo_url",
                    "organizationId",
                    "updatedAt"
                )
                VALUES (
                    'Your Company',
                    'https://via.placeholder.com/200x60',
                    '${orgId}',
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
                    INSERT INTO nav_items (name, link, "order", "isActive", "organizationId", "updatedAt")
                    VALUES (
                        '${item.name}',
                        '${item.link}',
                        ${item.order},
                        true,
                        '${orgId}',
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
                    INSERT INTO footer_product_links (name, link, "order", "organizationId")
                    VALUES (
                        '${link.name}',
                        '${link.link}',
                        ${link.order},
                        '${orgId}'
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
                    INSERT INTO footer_legal_links (name, link, "order", "organizationId")
                    VALUES (
                        '${link.name}',
                        '${link.link}',
                        ${link.order},
                        '${orgId}'
                    )
                    ON CONFLICT DO NOTHING
                `);
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove seeded data in reverse order (respecting foreign keys)
        await queryRunner.query(`DELETE FROM footer_legal_links WHERE "organizationId" IS NOT NULL`);
        await queryRunner.query(`DELETE FROM footer_product_links WHERE "organizationId" IS NOT NULL`);
        await queryRunner.query(`DELETE FROM nav_items WHERE "organizationId" IS NOT NULL`);
        await queryRunner.query(`DELETE FROM dashboard_branding WHERE "organizationId" IS NOT NULL`);
        await queryRunner.query(`DELETE FROM dashboard_hero WHERE "organizationId" IS NOT NULL`);
        await queryRunner.query(`DELETE FROM theme WHERE "organizationId" IS NOT NULL`);
        await queryRunner.query(`DELETE FROM announcement WHERE "organizationId" IS NOT NULL`);
        await queryRunner.query(`DELETE FROM footer WHERE "organizationId" IS NOT NULL`);
        await queryRunner.query(`DELETE FROM testimonials WHERE "organizationId" IS NOT NULL`);
        await queryRunner.query(`DELETE FROM newsletter WHERE "organizationId" IS NOT NULL`);
        await queryRunner.query(`DELETE FROM why_choose_us WHERE "organizationId" IS NOT NULL`);
        await queryRunner.query(`DELETE FROM menu_section WHERE "organizationId" IS NOT NULL`);
        await queryRunner.query(`DELETE FROM stats WHERE "organizationId" IS NOT NULL`);
        await queryRunner.query(`DELETE FROM location WHERE "organizationId" IS NOT NULL`);
        await queryRunner.query(`DELETE FROM contact WHERE "organizationId" IS NOT NULL`);
    }
}