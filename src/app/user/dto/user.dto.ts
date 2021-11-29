import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class loginDTO {
  @IsEmail()
  @MinLength(4)
  @ApiProperty({ example: 'admin@demo.com', description: 'email' })
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @ApiProperty({ example: 'admindemo', description: 'password should be min6length and max 20' })
  password: string;
}

export class authDTO {
  @IsEmail()
  @MinLength(4)
  @ApiProperty({ example: 'admin@demo.com', description: 'email' })
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @ApiProperty({ example: 'admindemo', description: 'password should be min6length and max 20' })
  password: string;
}

export class craateUserDTO extends loginDTO {

  @IsString()
  @MinLength(4)
  name: string;

  @IsString()
  @MinLength(4)
  lastname: string;
}
