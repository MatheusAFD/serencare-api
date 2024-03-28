import { ApiProperty } from '@nestjs/swagger'

import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

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
  @IsOptional()
  birthday: Date

  @ApiProperty()
  @IsString()
  companyId: string

  @ApiProperty()
  @IsString()
  roleId: string
}
