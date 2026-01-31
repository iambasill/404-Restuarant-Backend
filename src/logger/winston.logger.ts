

import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { ensureLogDir } from './logger.path';


ensureLogDir('logs');
export const winstonLogger = WinstonModule.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console(
      {
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }
  ),

    new winston.transports.DailyRotateFile({
      dirname: 'logs',
      filename: 'app-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '50m',
      maxFiles: '30d',
      zippedArchive: true,
    }),
  ],
});
