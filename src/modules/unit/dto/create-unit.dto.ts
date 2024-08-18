import { ApiProperty } from '@nestjs/swagger'
import { StatusType } from '@prisma/client'

import { IsEnum, IsString, MinLength } from 'class-validator'

export class CreateUnitDTO {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsString()
  city: string

  @ApiProperty()
  @IsString()
  number: string

  @ApiProperty()
  @IsString()
  state: string

  @ApiProperty({
    minLength: 8
  })
  @IsString()
  @MinLength(8)
  zipcode: string

  @ApiProperty({ enum: StatusType })
  @IsEnum(StatusType)
  status: StatusType

  @ApiProperty()
  @IsString()
  companyId: string
}
