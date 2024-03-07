import { ApiProperty } from '@nestjs/swagger'

import { IsBoolean, IsNumber, IsString, Max, Min } from 'class-validator'

export class CreatePlanDTO {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsNumber()
  amount: number

  @ApiProperty({
    minimum: 1,
    maximum: 31
  })
  @IsNumber()
  @Min(1)
  @Max(31)
  duration: number

  @ApiProperty()
  @IsBoolean()
  isFree: boolean

  @ApiProperty()
  @IsBoolean()
  isTrial: boolean
}
