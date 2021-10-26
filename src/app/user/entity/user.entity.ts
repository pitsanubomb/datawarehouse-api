import { DefaultEntity } from 'src/app/core/dbentity/default.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { classToPlain, Expose } from 'class-transformer';
import { IsEmail } from 'class-validator';

@Entity('user')
export class UserEntity extends DefaultEntity {
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Expose()
  @Column()
  password: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: null, nullable: true })
  avatar: string | null;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 20);
  }

  async comparePassword(_password: string) {
    return await bcrypt.compare(_password, this.password);
  }

  toJson() {
    return classToPlain(this);
  }
}
