import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { NotificationModule } from './notification/notification.module';
import { OtpModule } from './otp/otp.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

const NODE_ENV = (process.env.NODE_ENV || 'development').trim();
console.log(`Running in ${NODE_ENV} mode`);

// Log ALL environment variables
console.log('=== ALL ENV VARIABLES (app.module.ts) ===');
const allEnv = {};
Object.keys(process.env).forEach(key => {
  allEnv[key] = process.env[key];
});
console.log(JSON.stringify(allEnv, null, 2));
console.log('=== END ENV VARIABLES ===');

console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set!');
  console.error('For migrations, you need to:');
  console.error('1. Create a .env.development file with DATABASE_URL');
  console.error('2. Or set DATABASE_URL in your terminal');
  throw new Error('DATABASE_URL is required for migrations');
}
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: NODE_ENV === 'production' ? '.env' : `.env.${NODE_ENV}`,
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
    DatabaseModule,
    AuthModule,
    UserModule,
    NotificationModule,
    OtpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
