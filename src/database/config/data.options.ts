import { DataSourceOptions } from 'typeorm';

export const createDatabaseOptions = (): DataSourceOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME,
  password: String(process.env.DB_PASSWORD), // important
  database: process.env.DB_NAME,

  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
  synchronize: false,
});
