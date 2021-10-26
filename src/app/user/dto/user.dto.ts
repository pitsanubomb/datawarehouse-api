import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class loginDTO {
  @IsEmail()
  @MinLength(4)
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
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
