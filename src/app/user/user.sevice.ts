import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { craateUserDTO, loginDTO } from './dto/user.dto';
import { UserEntity } from './entity/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  private readonly users: any;
  constructor(
    @InjectRepository(UserEntity, 'user')
    private readonly userRepo: Repository<UserEntity>,
  ) {}
  async hashPassword(password: string) {
    return await bcrypt.hash(password, bcrypt.genSaltSync(10));
  }

  async createuser(user: craateUserDTO) {
    try {
      user.password = await this.hashPassword(user.password);
      return await this.userRepo.save(user);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY')
        throw new ConflictException(`Username is already been taken`);
      throw new InternalServerErrorException();
    }
  }

  async find(_email: string) {
    return this.users.find(user => user.username === _email);
  }

  async loginUser({ email, password }: loginDTO) {
    try {
      const user = await this.userRepo.findOneOrFail({
        where: { email: email },
      });
      const isValid = await user.comparePassword(password);
      const isActive = user.isActive;
      if (!isValid || !isActive) {
        throw new UnauthorizedException('Invalid credentials');
      }
      // console.log(user)
      return user.toJson();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
