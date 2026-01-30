import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos/create.user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from 'src/user/dtos/login.user.dto';
import { JwtService } from '@nestjs/jwt';
import { PublicRoute } from './decorator/allow-anonymous.decorator';
import { AuthService } from './auth.service';
import { HashingProvider } from './providers/hashing.provider';
import { CreateUserSessionDto } from 'src/user/dtos/user.session.dto';
import { ConfigService } from '@nestjs/config';
import { ResetPasswordDto } from './dtos/reset.password.dto';
import { forgotPasswordDto } from './dtos/forgot.password.dto';
import { OtpService } from 'src/otp/otp.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserRegistrationEvent } from 'src/notification/events/user.registration.event';
import { verifyAccountDto } from './dtos/verify.account.dto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { forgotPasswordEvent } from 'src/notification/events/forgot.password.event';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly hashingProvider: HashingProvider,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly otpService: OtpService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @PublicRoute()
  @Post('register')
  async createUser(@Body() req: CreateUserDto) {
    try {
      req.password = await this.hashingProvider.createHash(req.password);
      await this.userService.createUser(req);

      this.eventEmitter.emit(
        'user.created',
        new UserRegistrationEvent(req.email, req.firstName),
      );

      return {
        success: true,
        message: 'User created successful',
      };
    } catch (error) {
      throw error;
    }
  }

  @PublicRoute()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  public async loginUser(
    @Body() loginData: LoginDto,
    @Headers() headers: Record<string, string>,
  ) {
    const user = await this.userService.getByEmail(loginData.email);
    if (!user) throw new UnauthorizedException('Invalid Details');
    if (user.status === 'pending') {
      this.eventEmitter.emit(
        'user.created',
        new UserRegistrationEvent(user.email, user.firstName),
      );

      return {
        message: 'User not verified.. please check email',
        status: 'pending',
      };
    }

    if (user.status !== 'active') throw new UnauthorizedException();

    const valid = await this.hashingProvider.comparePassword(
      loginData.password,
      user.password,
    );

    if (!valid) {
      throw new UnauthorizedException('Invalid Details');
    }

    const { token, refreshToken } = await this.authService.generateAuthToken({
      sub: user.id,
      email: user.email,
    });

    const session: CreateUserSessionDto = {
      user: user,
      ipAddress: headers['x-forwarded-for'] || headers['host'] || 'unknown',
      device: headers['user-agent'],
    };

    await this.authService.newSession(session);

    return {
      message: 'Login successful',
      status: 'active',
      token: token
    };
  }

  @PublicRoute()
  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  public async refreshToken(@Body() req: RefreshTokenDto) {
    try {
      const payload = await this.jwtService.verifyAsync(req.refreshToken, {
        secret: this.config.get('JWT_REFRESH_TOKEN_SECRET'),
      });
      await this.userService.getByEmail(payload.email);

      const { token, refreshToken } = await this.authService.generateAuthToken({
        sub: payload.id,
        email: payload.email,
      });

      return {
        token: token,
        refreshToken: refreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  @PublicRoute()
  @HttpCode(HttpStatus.OK)
  @Post('forgot-password')
  public async forgotPassword(@Body() body: forgotPasswordDto) {
    const user = await this.userService.getByEmail(body.email);
    if (!user) throw new BadRequestException('User not found!');

    this.eventEmitter.emit(
      'forgot.password',
      new forgotPasswordEvent(user.email, user.firstName),
    );

    return {
      message: 'Token sent to email ',
    };
  }

  @PublicRoute()
  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  public async resetPassword(@Body() body: ResetPasswordDto) {
    await this.otpService.verifyOtpCode(body.email, body.token);
    const hashedPassword = await this.hashingProvider.createHash(
      body.newPassword,
    );

    await this.userService.changePassword(body.email, hashedPassword);

    return {
      message: 'Password reset successfully',
    };
  }

  @PublicRoute()
  @HttpCode(HttpStatus.OK)
  @Post('verify-account')
  public async verifyAccount(@Body() body: verifyAccountDto) {
    await this.authService.verifyAccount(body.email, body.token);
    await this.userService.activate(body.email);
    return {
      message: 'Email verified successfully',
    };
  }
}
