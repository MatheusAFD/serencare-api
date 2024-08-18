import { ApiProperty } from '@nestjs/swagger'
import { StatusType } from '@prisma/client'

import { IsDate, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator'

export class CreateEmployeeDTO {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsString()
  color: string

  @ApiProperty()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsOptional()
  @IsDate()
  birthday: Date

  @ApiProperty()
  @IsString()
  password: string

  @ApiProperty()
  @IsEnum(StatusType)
  @IsOptional()
  status: string
}
