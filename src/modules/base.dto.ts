import { IsDateString, IsOptional, IsString } from 'class-validator'

export class BaseDTO {
  @IsString()
  id: string

  @IsOptional()
  @IsDateString()
  createdAt?: Date

  @IsOptional()
  @IsDateString()
  updatedAt?: Date

  @IsOptional()
  @IsDateString()
  deletedAt?: Date
}
