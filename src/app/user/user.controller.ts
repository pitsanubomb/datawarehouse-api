import { Body, Controller,  Post, ValidationPipe } from '@nestjs/common';
import { craateUserDTO } from './dto/user.dto';
import { UserService } from './user.sevice';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post()
  async addUser(@Body(ValidationPipe) user: craateUserDTO) {
    return await this._userService.createuser(user);
  }
}
