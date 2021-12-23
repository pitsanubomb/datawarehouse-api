import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthenService } from './auth.service';
// import { Response } from 'express';
import { LocalAuthGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { authDTO, loginDTO } from '../user/dto/user.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authen')
export class AuthController {
  constructor(private readonly authService: AuthenService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: authDTO })
  async login(@Body() body: authDTO,@Request() req:any) {
    const token = await this.authService.login(req.user);
    return { token: token.access_token };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('me')
  async getMe(@Request() req) {
    return req.user;
  }
}
