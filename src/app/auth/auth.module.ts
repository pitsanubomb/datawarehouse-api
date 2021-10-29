import { jwtConstants } from './constant';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthenService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthenService, LocalStrategy,JwtStrategy],
  exports:[AuthenService]
})
export class AuthModule {}
