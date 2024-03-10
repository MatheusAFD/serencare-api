import { ApiProperty } from '@nestjs/swagger'

import { CreateCompanyDTO } from './create-company.dto'

import { IsEmail, IsString, MinLength } from 'class-validator'

export class CreateCompanyAndUserDTO extends CreateCompanyDTO {
  @ApiProperty()
  @IsEmail()
  email: string

  @ApiProperty({
    minLength: 4
  })
  @IsString()
  @MinLength(4)
  userName: string

  @ApiProperty()
  @IsString()
  password: string

  @ApiProperty()
  @IsString()
  planId: string
}
