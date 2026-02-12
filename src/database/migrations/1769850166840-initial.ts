import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1769850166840 implements MigrationInterface {
    name = 'Initial1769850166840'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Enable UUID extension
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(30) NOT NULL, "lastName" character varying(30) NOT NULL, "email" character varying(30) NOT NULL, "status" character varying NOT NULL DEFAULT 'pending', "password" character varying(150) NOT NULL, "role" character varying NOT NULL DEFAULT 'user', "avatarUrl" character varying(150), "timezone" character varying DEFAULT 'UTC', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ipAddress" character varying(150), "device" character varying(200), "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_e93e031a5fed190d4789b6bfd83" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "otp" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "token" character varying NOT NULL, "secret" character varying NOT NULL, "expires" TIMESTAMP NOT NULL, CONSTRAINT "PK_32556d9d7b22031d7d0e1fd6723" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "menu_categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "slug" character varying, "description" text, "image" character varying, "order" integer NOT NULL DEFAULT '1', "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_30e8482d17959bb79ead70da22d" UNIQUE ("name"), CONSTRAINT "PK_124ae987900336f983881cb04e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "menu_items" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "slug" character varying, "description" text NOT NULL, "price" numeric(10,2) NOT NULL, "image" character varying, "categoryId" integer, "isActive" boolean NOT NULL DEFAULT true, "isAvailable" boolean NOT NULL DEFAULT true, "isFeatured" boolean NOT NULL DEFAULT false, "order" integer NOT NULL DEFAULT '1', "preparationTime" character varying, "tags" text, "allergens" text, "calories" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_57e6188f929e5dc6919168620c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "why_choose_us" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "subtitle" text NOT NULL, "image" character varying NOT NULL, "contentParagraph1" text NOT NULL, "contentParagraph2" text NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4d0ef28c2281929617c9f141ed8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "why_choose_us_items" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "order" integer NOT NULL DEFAULT '1', CONSTRAINT "PK_11177f4a263be749528481a9f86" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "why_choose_us_checks" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "order" integer NOT NULL DEFAULT '1', CONSTRAINT "PK_59d22d78be4682a77dc1f74f7dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "theme" ("id" SERIAL NOT NULL, "primaryColor" character varying NOT NULL DEFAULT '#f97316', "secondaryColor" character varying NOT NULL DEFAULT '#111111', "backgroundColor" character varying NOT NULL DEFAULT '#000000', "textColor" character varying NOT NULL DEFAULT '#ffffff', "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c1934d0b4403bf10c1ab0c18166" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "testimonials" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_63b03c608bd258f115a0a4a1060" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "testimonial_items" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "title" character varying NOT NULL, "rating" integer NOT NULL DEFAULT '5', "text" text NOT NULL, "image" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "order" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3f6b3d9dd0303ce7deec794e0ae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "stats" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c76e93dfef28ba9b6942f578ab1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "stat_items" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, "label" character varying NOT NULL, "order" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e1b40458212593b0a8c122f0985" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "newsletter" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "placeholder" character varying NOT NULL, "buttonText" character varying NOT NULL, "backgroundImage" text NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_036bb790d1d19efeacfd2f3740c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "newsletter_subscribers" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "subscribedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_0dc48416511f011f7de7b2a8f83" UNIQUE ("email"), CONSTRAINT "PK_38f9333e9961b2fdb589128d19b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "nav_items" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "link" character varying NOT NULL, "order" integer NOT NULL DEFAULT '1', "isActive" boolean NOT NULL DEFAULT true, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_53ae61095dbd44d41775cccd2c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contact" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "address" text NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "menu_section" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "buttonText" character varying NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bdb64b3aaf192ece146d3d232f7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "location" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "subtitle" text NOT NULL, "mapUrl" text NOT NULL, "buttonText" character varying NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dashboard_hero" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "subTitle" character varying NOT NULL, "buttonText" character varying NOT NULL, "backgroundImage" character varying NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_57ce64fc205aea2ea8ab16a7fb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "footer" ("id" SERIAL NOT NULL, "productsTitle" character varying NOT NULL, "legalTitle" character varying NOT NULL, "contactTitle" character varying NOT NULL, "acceptTitle" character varying NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9eea7c25d14157b981b8feb29dc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "footer_product_links" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "link" character varying NOT NULL, "order" integer NOT NULL DEFAULT '1', CONSTRAINT "PK_77de869fe9e95ca04c349c38b66" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "footer_legal_links" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "link" character varying NOT NULL, "order" integer NOT NULL DEFAULT '1', CONSTRAINT "PK_97ddac8eda0864b7eafecedc6dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dashboard_branding" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "logo_url" character varying NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7765b9613b91f0c2e09264a2416" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "announcement" ("id" SERIAL NOT NULL, "isActive" boolean NOT NULL DEFAULT false, "title" character varying NOT NULL, "description" text NOT NULL, "image" character varying, "buttonText" character varying NOT NULL, "buttonLink" character varying NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e0ef0550174fd1099a308fd18a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_sessions" ADD CONSTRAINT "FK_55fa4db8406ed66bc7044328427" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_items" ADD CONSTRAINT "FK_d56e5ccc298e8bf721f75a7eb96" FOREIGN KEY ("categoryId") REFERENCES "menu_categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "menu_items" DROP CONSTRAINT "FK_d56e5ccc298e8bf721f75a7eb96"`);
        await queryRunner.query(`ALTER TABLE "user_sessions" DROP CONSTRAINT "FK_55fa4db8406ed66bc7044328427"`);
        await queryRunner.query(`DROP TABLE "announcement"`);
        await queryRunner.query(`DROP TABLE "dashboard_branding"`);
        await queryRunner.query(`DROP TABLE "footer_legal_links"`);
        await queryRunner.query(`DROP TABLE "footer_product_links"`);
        await queryRunner.query(`DROP TABLE "footer"`);
        await queryRunner.query(`DROP TABLE "dashboard_hero"`);
        await queryRunner.query(`DROP TABLE "location"`);
        await queryRunner.query(`DROP TABLE "menu_section"`);
        await queryRunner.query(`DROP TABLE "contact"`);
        await queryRunner.query(`DROP TABLE "nav_items"`);
        await queryRunner.query(`DROP TABLE "newsletter_subscribers"`);
        await queryRunner.query(`DROP TABLE "newsletter"`);
        await queryRunner.query(`DROP TABLE "stat_items"`);
        await queryRunner.query(`DROP TABLE "stats"`);
        await queryRunner.query(`DROP TABLE "testimonial_items"`);
        await queryRunner.query(`DROP TABLE "testimonials"`);
        await queryRunner.query(`DROP TABLE "theme"`);
        await queryRunner.query(`DROP TABLE "why_choose_us_checks"`);
        await queryRunner.query(`DROP TABLE "why_choose_us_items"`);
        await queryRunner.query(`DROP TABLE "why_choose_us"`);
        await queryRunner.query(`DROP TABLE "menu_items"`);
        await queryRunner.query(`DROP TABLE "menu_categories"`);
        await queryRunner.query(`DROP TABLE "otp"`);
        await queryRunner.query(`DROP TABLE "user_sessions"`);
        await queryRunner.query(`DROP TABLE "user"`);
        
        // Drop UUID extension
        await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp"`);
    }

}