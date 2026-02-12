import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from "bcrypt";

export class SeedDefaultOrganizationAndUsers1769850180615 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const hashedPassword = await bcrypt.hash('password', 10);
    
        
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
    }
}