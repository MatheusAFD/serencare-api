import { ApiProperty } from '@nestjs/swagger'

import { IsEmail, IsString, MinLength } from 'class-validator'

export class CreateUserDTO {
  @ApiProperty()
  @IsEmail()
  email: string

  @ApiProperty({
    minLength: 4
  })
  @IsString()
  @MinLength(4)
  name: string

  @ApiProperty()
  @IsString()
  password: string

  @ApiProperty()
  @IsString()
  companyId: string

  @ApiProperty()
  @IsString()
  roleId: string
}
