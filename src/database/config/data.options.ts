import { DataSourceOptions } from 'typeorm';

export const createDatabaseOptions = (): DataSourceOptions => ({
  type: 'postgres',
  url: process.env.DATABASE_URL,

  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
  synchronize: false,
});
