import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class loginDTO {
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}

export class craateUserDTO extends loginDTO {
  @IsEmail()
  @MinLength(4)
  email: string;

  @IsString()
  @MinLength(4)
  name: string;

  @IsString()
  @MinLength(4)
  lastname: string;
}
