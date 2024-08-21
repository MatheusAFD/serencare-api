import { IsString } from 'class-validator'

export class ConnectActiveCompanyPlanToCompanyUseCaseDTO {
  @IsString()
  companyId: string

  @IsString()
  planId: string
}
