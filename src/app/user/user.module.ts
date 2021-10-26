import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.sevice';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity], 'user')],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
