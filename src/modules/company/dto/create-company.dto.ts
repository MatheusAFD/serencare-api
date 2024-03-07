import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MinLength
} from 'class-validator'

export class CreateCompanyDTO {
  @ApiProperty()
  @IsString()
  name: string

  @ApiPropertyOptional({
    minLength: 14
  })
  @IsString()
  @IsOptional()
  @MinLength(14)
  cnpj: string

  @ApiProperty()
  @IsBoolean()
  isActive: boolean

  @ApiPropertyOptional({
    minLength: 11
  })
  @IsString()
  @IsOptional()
  @MinLength(11)
  cpf: string

  @ApiProperty()
  @IsInt()
  remainingDaysWithActivePlan: number

  @ApiProperty()
  @IsString()
  activePlanId: string
}
