import { IsBoolean, IsNumber, IsString, Max, Min } from 'class-validator'

export class CreatePlanDto {
  @IsString()
  name: string

  @IsNumber()
  amount: number

  @IsNumber()
  @Min(1)
  @Max(31)
  duration: number

  @IsBoolean()
  isFree: boolean

  @IsBoolean()
  isTrial: boolean
}
