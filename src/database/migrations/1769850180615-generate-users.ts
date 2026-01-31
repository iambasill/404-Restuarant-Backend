import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from "bcrypt";

export class SeedDefaultOrganizationAndUsers1769850180615 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const hashedPassword = await bcrypt.hash('password', 10);
        
        const organizationResult = await queryRunner.query(`
            INSERT INTO organizations (
                id,
                name,
                slug,
                description,
                "primaryEmail",
                "primaryPhone",
                address,
                status,
                currency,
                timezone,
                plan,
                "createdAt",
                "updatedAt"
            ) VALUES (
                gen_random_uuid(),
                'The Gourmet Kitchen',
                'the-gourmet-kitchen',
                'A fine dining restaurant offering exquisite culinary experiences',
                'info@gourmetkitchen.com',
                '+1-555-0123',
                '123 Main Street, Downtown, NY 10001',
                'active',
                'USD',
                'America/New_York',
                'premium',
                NOW(),
                NOW()
            )
            RETURNING id
        `);
        
        const organizationId = organizationResult[0].id;
        
        // Create users with different roles
        await queryRunner.query(`
            INSERT INTO "user" (
                id,
                "firstName",
                "lastName",
                email,
                password,
                role,
                status,
                timezone,
                "organizationId",
                "createdAt",
                "updatedAt"
            ) VALUES 
            -- Admin/Owner
            (
                gen_random_uuid(),
                'John',
                'Doe',
                'admin@app.com',
                '${hashedPassword}',
                'admin',
                'active',
                'America/New_York',
                '${organizationId}',
                NOW(),
                NOW()
            ),
            -- Manager
            (
                gen_random_uuid(),
                'Sarah',
                'Johnson',
                'manager@app.com',
                '${hashedPassword}',
                'manager',
                'active',
                'America/New_York',
                '${organizationId}',
                NOW(),
                NOW()
            ),
            -- Chef
            (
                gen_random_uuid(),
                'Michael',
                'Chen',
                'chef@app.com',
                '${hashedPassword}',
                'chef',
                'active',
                'America/New_York',
                '${organizationId}',
                NOW(),
                NOW()
            ),
            -- Waiter/Server
            (
                gen_random_uuid(),
                'Emily',
                'Rodriguez',
                'waiter@app.com',
                '${hashedPassword}',
                'waiter',
                'active',
                'America/New_York',
                '${organizationId}',
                NOW(),
                NOW()
            ),
            -- Host/Receptionist
            (
                gen_random_uuid(),
                'David',
                'Williams',
                'host@app.com',
                '${hashedPassword}',
                'host',
                'active',
                'America/New_York',
                '${organizationId}',
                NOW(),
                NOW()
            ),
            -- Regular User/Customer
            (
                gen_random_uuid(),
                'Lisa',
                'Anderson',
                'user@app.com',
                '${hashedPassword}',
                'user',
                'active',
                'America/New_York',
                '${organizationId}',
                NOW(),
                NOW()
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Delete users first (due to foreign key constraint)
        await queryRunner.query(`
            DELETE FROM "user" 
            WHERE email IN (
                'admin@app.com',
                'manager@app.com',
                'chef@app.com',
                'waiter@app.com',
                'host@app.com',
                'user@app.com'
            )
        `);
        
        // Delete the organization
        await queryRunner.query(`
            DELETE FROM organizations 
            WHERE slug = 'the-gourmet-kitchen'
        `);
    }
}