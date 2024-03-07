import { ApiProperty } from '@nestjs/swagger'
import { StatusType } from '@prisma/client'

import { IsEnum, IsString } from 'class-validator'

export class CreateRoomDTO {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsString()
  floor: string

  @ApiProperty({ enum: StatusType })
  @IsEnum(StatusType)
  status: StatusType

  @ApiProperty()
  @IsString()
  unityId: string
}
