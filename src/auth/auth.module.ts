import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserModule } from '@user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

const JWT_SECRET = 'JWT_SECRET';
const PASSPORT_STRATEGY = 'jwt';
const JWT_EXPIRATION_TIME = '2h';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ConfigService],
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: PASSPORT_STRATEGY }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>(JWT_SECRET),
        signOptions: { expiresIn: JWT_EXPIRATION_TIME },
      }),
    }),
  ],
})
export class AuthModule {}
