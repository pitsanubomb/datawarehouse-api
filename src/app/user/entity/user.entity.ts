import { DefaultEntity } from 'src/app/core/dbentity/default.entity';
import { Column, Entity } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { classToPlain, Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';

@Entity('user')
export class UserEntity extends DefaultEntity {
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column({ default: null, nullable: true })
  key: string;

  @Column({ default: null, nullable: true })
  avatar: string | null;

  async comparePassword(_password: string) {
    return await bcrypt.compare(_password, this.password);
  }

  toJson() {
    return classToPlain(this);
  }
}
