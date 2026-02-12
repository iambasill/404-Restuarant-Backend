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
import { MenuModule } from './menu/menu.module';
import { SiteSettingsModule } from './dashboard/site-settings.module';


const NODE_ENV = (process.env.NODE_ENV || 'development').trim();
console.log(`Running in ${NODE_ENV} mode`);

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
    MenuModule,
    SiteSettingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
