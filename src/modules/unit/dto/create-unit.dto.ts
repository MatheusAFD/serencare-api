import { StatusType } from '@prisma/client'

import { IsEnum, IsString, MinLength } from 'class-validator'

export class CreateUnitDto {
  @IsString()
  city: string

  @IsString()
  number: string

  @IsString()
  state: string

  @IsString()
  @MinLength(8)
  zipcode: string

  @IsEnum(StatusType)
  status: StatusType

  @IsString()
  companyId: string
}
