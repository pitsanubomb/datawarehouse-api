import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.sevice';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    try {
      const user = await this.userService.loginUser({
        email: email,
        password: pass,
      });
      if (user) {
        return user;
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return null;
  }

  async login(user: any) {
    const payload = { user: user };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
