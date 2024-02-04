import { IsEmail, IsString, MinLength } from 'class-validator'

export class CreateUserDTO {
  @IsEmail()
  email: string

  @IsString()
  @MinLength(4)
  name: string

  @IsString()
  password: string
}
