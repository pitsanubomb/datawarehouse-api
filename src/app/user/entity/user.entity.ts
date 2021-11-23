import { Column, Entity } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { classToPlain, Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { DefaultUserEntity } from 'src/app/core/dbentity/defalut.user.entity';

@Entity('user')
export class UserEntity extends DefaultUserEntity {
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  name: string;

  @Column()
  lastname: string;


  @Column({ default: null, nullable: true })
  avatar: string | null;

  async comparePassword(_password: string) {
    return await bcrypt.compare(_password, this.password);
  }

  toJson() {
    return classToPlain(this);
  }
}
