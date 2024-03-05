import { StatusType } from '@prisma/client'

import { IsEnum, IsString } from 'class-validator'

export class CreateRoomDto {
  @IsString()
  name: string

  @IsString()
  floor: string

  @IsEnum(StatusType)
  status: StatusType

  @IsString()
  unityId: string
}
