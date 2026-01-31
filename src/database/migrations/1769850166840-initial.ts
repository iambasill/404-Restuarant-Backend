import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1769850166840 implements MigrationInterface {
    name = 'Initial1769850166840'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "organizations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "slug" character varying, "description" text, "logo" character varying, "website" character varying, "primaryEmail" character varying, "primaryPhone" character varying, "address" text, "status" character varying NOT NULL DEFAULT 'active', "currency" character varying(10) NOT NULL DEFAULT 'USD', "timezone" character varying NOT NULL DEFAULT 'UTC', "plan" character varying, "subscriptionExpiresAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_9b7ca6d30b94fef571cff876884" UNIQUE ("name"), CONSTRAINT "UQ_963693341bd612aa01ddf3a4b68" UNIQUE ("slug"), CONSTRAINT "PK_6b031fcd0863e3f6b44230163f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(30) NOT NULL, "lastName" character varying(30) NOT NULL, "email" character varying(30) NOT NULL, "status" character varying NOT NULL DEFAULT 'pending', "password" character varying(150) NOT NULL, "role" character varying NOT NULL DEFAULT 'user', "avatarUrl" character varying(150), "timezone" character varying DEFAULT 'UTC', "organizationId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ipAddress" character varying(150), "device" character varying(200), "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_e93e031a5fed190d4789b6bfd83" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "otp" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "token" character varying NOT NULL, "secret" character varying NOT NULL, "expires" TIMESTAMP NOT NULL, CONSTRAINT "PK_32556d9d7b22031d7d0e1fd6723" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "menu_categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "slug" character varying, "description" text, "image" character varying, "order" integer NOT NULL DEFAULT '1', "isActive" boolean NOT NULL DEFAULT true, "organizationId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_30e8482d17959bb79ead70da22d" UNIQUE ("name"), CONSTRAINT "PK_124ae987900336f983881cb04e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "menu_items" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "slug" character varying, "description" text NOT NULL, "price" numeric(10,2) NOT NULL, "image" character varying, "categoryId" integer, "isActive" boolean NOT NULL DEFAULT true, "isAvailable" boolean NOT NULL DEFAULT true, "isFeatured" boolean NOT NULL DEFAULT false, "order" integer NOT NULL DEFAULT '1', "preparationTime" character varying, "tags" text, "allergens" text, "calories" integer NOT NULL DEFAULT '0', "organizationId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_57e6188f929e5dc6919168620c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "why_choose_us" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "subtitle" text NOT NULL, "image" character varying NOT NULL, "contentParagraph1" text NOT NULL, "contentParagraph2" text NOT NULL, "organizationId" uuid NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4d0ef28c2281929617c9f141ed8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "why_choose_us_items" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "order" integer NOT NULL DEFAULT '1', "organizationId" uuid NOT NULL, CONSTRAINT "PK_11177f4a263be749528481a9f86" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "why_choose_us_checks" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "order" integer NOT NULL DEFAULT '1', "organizationId" uuid NOT NULL, CONSTRAINT "PK_59d22d78be4682a77dc1f74f7dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "theme" ("id" SERIAL NOT NULL, "primaryColor" character varying NOT NULL DEFAULT '#f97316', "secondaryColor" character varying NOT NULL DEFAULT '#111111', "backgroundColor" character varying NOT NULL DEFAULT '#000000', "textColor" character varying NOT NULL DEFAULT '#ffffff', "organizationId" uuid NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c1934d0b4403bf10c1ab0c18166" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "testimonials" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "organizationId" uuid NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_63b03c608bd258f115a0a4a1060" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "testimonial_items" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "title" character varying NOT NULL, "rating" integer NOT NULL DEFAULT '5', "text" text NOT NULL, "image" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "order" integer NOT NULL DEFAULT '1', "organizationId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3f6b3d9dd0303ce7deec794e0ae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "stats" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "organizationId" uuid NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c76e93dfef28ba9b6942f578ab1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "stat_items" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, "label" character varying NOT NULL, "order" integer NOT NULL DEFAULT '1', "organizationId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e1b40458212593b0a8c122f0985" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "newsletter" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "placeholder" character varying NOT NULL, "buttonText" character varying NOT NULL, "backgroundImage" text NOT NULL, "organizationId" uuid NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_036bb790d1d19efeacfd2f3740c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "newsletter_subscribers" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "subscribedAt" TIMESTAMP NOT NULL DEFAULT now(), "organizationId" uuid NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_0dc48416511f011f7de7b2a8f83" UNIQUE ("email"), CONSTRAINT "PK_38f9333e9961b2fdb589128d19b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "nav_items" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "link" character varying NOT NULL, "order" integer NOT NULL DEFAULT '1', "isActive" boolean NOT NULL DEFAULT true, "organizationId" uuid NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_53ae61095dbd44d41775cccd2c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contact" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "address" character varying NOT NULL, "organizationId" uuid NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "menu_section" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "buttonText" character varying NOT NULL, "organizationId" uuid NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bdb64b3aaf192ece146d3d232f7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "location" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "subtitle" text NOT NULL, "mapUrl" text NOT NULL, "buttonText" character varying NOT NULL, "organizationId" uuid NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dashboard_hero" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "subTitle" character varying NOT NULL, "buttonText" character varying NOT NULL, "backgroundImage" character varying NOT NULL, "organizationId" uuid NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_57ce64fc205aea2ea8ab16a7fb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "footer" ("id" SERIAL NOT NULL, "productsTitle" character varying NOT NULL, "legalTitle" character varying NOT NULL, "contactTitle" character varying NOT NULL, "acceptTitle" character varying NOT NULL, "organizationId" uuid NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9eea7c25d14157b981b8feb29dc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "footer_product_links" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "link" character varying NOT NULL, "order" integer NOT NULL DEFAULT '1', "organizationId" uuid NOT NULL, CONSTRAINT "PK_77de869fe9e95ca04c349c38b66" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "footer_legal_links" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "link" character varying NOT NULL, "order" integer NOT NULL DEFAULT '1', "organizationId" uuid NOT NULL, CONSTRAINT "PK_97ddac8eda0864b7eafecedc6dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dashboard_branding" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "logo_url" character varying NOT NULL, "organizationId" uuid NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7765b9613b91f0c2e09264a2416" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "announcement" ("id" SERIAL NOT NULL, "isActive" boolean NOT NULL DEFAULT false, "title" character varying NOT NULL, "description" text NOT NULL, "image" character varying, "buttonText" character varying NOT NULL, "buttonLink" character varying NOT NULL, "organizationId" uuid NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e0ef0550174fd1099a308fd18a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contact" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "contact" ADD "address" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_dfda472c0af7812401e592b6a61" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_sessions" ADD CONSTRAINT "FK_55fa4db8406ed66bc7044328427" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_categories" ADD CONSTRAINT "FK_8d7ad950d70a1afc0eb2837bcc6" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_items" ADD CONSTRAINT "FK_d56e5ccc298e8bf721f75a7eb96" FOREIGN KEY ("categoryId") REFERENCES "menu_categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_items" ADD CONSTRAINT "FK_0875164e0974d4baba08954376e" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "why_choose_us" ADD CONSTRAINT "FK_05f0cae310c27b65f43beae79ed" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "why_choose_us_items" ADD CONSTRAINT "FK_bd9342daf5e8b9d6a521cce0e4a" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "why_choose_us_checks" ADD CONSTRAINT "FK_4c3b541df8ecd52fc4c02401f28" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "theme" ADD CONSTRAINT "FK_ba732abd6f2682f94f0e592b55a" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "testimonials" ADD CONSTRAINT "FK_fbdd8e42ee32cb8a779bb752cff" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "testimonial_items" ADD CONSTRAINT "FK_7cccc1ad652a1f94a3c92f59449" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stats" ADD CONSTRAINT "FK_1210efed4c1abdf2b9c4b363aa2" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stat_items" ADD CONSTRAINT "FK_2128b8fb9c1a6a8cd90d047f694" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "newsletter" ADD CONSTRAINT "FK_77a43e8cbc586e5aeebbf597e2d" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "newsletter_subscribers" ADD CONSTRAINT "FK_b1a74c5591a8191804fc083d790" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nav_items" ADD CONSTRAINT "FK_429d0a13f669e35a2b7687a990f" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contact" ADD CONSTRAINT "FK_7719d73cd16a9f57ecc6ac24b3d" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_section" ADD CONSTRAINT "FK_c52167c838b9483992989742097" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "location" ADD CONSTRAINT "FK_15ac9732fb93911a4e7a70c5340" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dashboard_hero" ADD CONSTRAINT "FK_0336ca10befd7c94c21d41f0854" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "footer" ADD CONSTRAINT "FK_13486fc16f0e0e3556e7221f56f" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "footer_product_links" ADD CONSTRAINT "FK_0c65ce7d4f98fe35f21fc303c3d" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "footer_legal_links" ADD CONSTRAINT "FK_ecaadd9f6928fe7399ab5598a03" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dashboard_branding" ADD CONSTRAINT "FK_96b5a87779755c25d131a3cd4cf" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "announcement" ADD CONSTRAINT "FK_3741c57db1f0e01b045c8256f22" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcement" DROP CONSTRAINT "FK_3741c57db1f0e01b045c8256f22"`);
        await queryRunner.query(`ALTER TABLE "dashboard_branding" DROP CONSTRAINT "FK_96b5a87779755c25d131a3cd4cf"`);
        await queryRunner.query(`ALTER TABLE "footer_legal_links" DROP CONSTRAINT "FK_ecaadd9f6928fe7399ab5598a03"`);
        await queryRunner.query(`ALTER TABLE "footer_product_links" DROP CONSTRAINT "FK_0c65ce7d4f98fe35f21fc303c3d"`);
        await queryRunner.query(`ALTER TABLE "footer" DROP CONSTRAINT "FK_13486fc16f0e0e3556e7221f56f"`);
        await queryRunner.query(`ALTER TABLE "dashboard_hero" DROP CONSTRAINT "FK_0336ca10befd7c94c21d41f0854"`);
        await queryRunner.query(`ALTER TABLE "location" DROP CONSTRAINT "FK_15ac9732fb93911a4e7a70c5340"`);
        await queryRunner.query(`ALTER TABLE "menu_section" DROP CONSTRAINT "FK_c52167c838b9483992989742097"`);
        await queryRunner.query(`ALTER TABLE "contact" DROP CONSTRAINT "FK_7719d73cd16a9f57ecc6ac24b3d"`);
        await queryRunner.query(`ALTER TABLE "nav_items" DROP CONSTRAINT "FK_429d0a13f669e35a2b7687a990f"`);
        await queryRunner.query(`ALTER TABLE "newsletter_subscribers" DROP CONSTRAINT "FK_b1a74c5591a8191804fc083d790"`);
        await queryRunner.query(`ALTER TABLE "newsletter" DROP CONSTRAINT "FK_77a43e8cbc586e5aeebbf597e2d"`);
        await queryRunner.query(`ALTER TABLE "stat_items" DROP CONSTRAINT "FK_2128b8fb9c1a6a8cd90d047f694"`);
        await queryRunner.query(`ALTER TABLE "stats" DROP CONSTRAINT "FK_1210efed4c1abdf2b9c4b363aa2"`);
        await queryRunner.query(`ALTER TABLE "testimonial_items" DROP CONSTRAINT "FK_7cccc1ad652a1f94a3c92f59449"`);
        await queryRunner.query(`ALTER TABLE "testimonials" DROP CONSTRAINT "FK_fbdd8e42ee32cb8a779bb752cff"`);
        await queryRunner.query(`ALTER TABLE "theme" DROP CONSTRAINT "FK_ba732abd6f2682f94f0e592b55a"`);
        await queryRunner.query(`ALTER TABLE "why_choose_us_checks" DROP CONSTRAINT "FK_4c3b541df8ecd52fc4c02401f28"`);
        await queryRunner.query(`ALTER TABLE "why_choose_us_items" DROP CONSTRAINT "FK_bd9342daf5e8b9d6a521cce0e4a"`);
        await queryRunner.query(`ALTER TABLE "why_choose_us" DROP CONSTRAINT "FK_05f0cae310c27b65f43beae79ed"`);
        await queryRunner.query(`ALTER TABLE "menu_items" DROP CONSTRAINT "FK_0875164e0974d4baba08954376e"`);
        await queryRunner.query(`ALTER TABLE "menu_items" DROP CONSTRAINT "FK_d56e5ccc298e8bf721f75a7eb96"`);
        await queryRunner.query(`ALTER TABLE "menu_categories" DROP CONSTRAINT "FK_8d7ad950d70a1afc0eb2837bcc6"`);
        await queryRunner.query(`ALTER TABLE "user_sessions" DROP CONSTRAINT "FK_55fa4db8406ed66bc7044328427"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_dfda472c0af7812401e592b6a61"`);
        await queryRunner.query(`ALTER TABLE "contact" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "contact" ADD "address" character varying NOT NULL`);
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
        await queryRunner.query(`DROP TABLE "organizations"`);
    }

}
