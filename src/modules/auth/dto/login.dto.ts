import { ApiProperty } from '@nestjs/swagger'

import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class LoginDTO {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({
    minLength: 6
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string
}
