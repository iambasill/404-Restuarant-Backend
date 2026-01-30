import 'dotenv/config';
import { DataSource } from 'typeorm';
import { createDatabaseOptions } from './config/data.options';

export default new DataSource(createDatabaseOptions());
