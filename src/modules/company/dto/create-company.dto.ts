import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator'

export class CreateCompanyDTO {
  @IsString()
  name: string

  @IsString()
  @IsOptional()
  @Min(14)
  cnpj: string

  @IsBoolean()
  isActive: boolean

  @IsString()
  @IsOptional()
  @Min(11)
  cpf: string

  @IsInt()
  remainingDaysWithActivePlan: number

  @IsString()
  activePlanId: string
}
