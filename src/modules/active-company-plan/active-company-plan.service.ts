import { Injectable } from '@nestjs/common'

import { PrismaService } from 'prisma/prisma.service'

@Injectable()
export class ActiveCompanyPlanService {
  constructor(private readonly prisma: PrismaService) {}

  async findActiveCompanyPlanByFromCompany(companyId: string) {
    return await this.prisma.activeCompanyPlan.findUnique({
      where: {
        companyId
      }
    })
  }
}
