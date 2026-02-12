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
            (
                uuid_generate_v4(),
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
            (
                uuid_generate_v4(),
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
            (
                uuid_generate_v4(),
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
            (
                uuid_generate_v4(),
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
            (
                uuid_generate_v4(),
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
            (
                uuid_generate_v4(),
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
        // Delete users
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