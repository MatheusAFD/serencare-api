import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class UpdateUserDTO {
  id: string

  @IsEmail()
  @IsOptional()
  email: string

  @IsString()
  @MinLength(4)
  @IsOptional()
  name: string
}
