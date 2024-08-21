import { ConflictException, Injectable } from '@nestjs/common'

import { PrismaService } from 'prisma/prisma.service'

import { ConnectActiveCompanyPlanToCompanyUseCaseDTO } from '../dto'

@Injectable()
export class ConnectActiveCompanyPlanToCompanyUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute({
    companyId,
    planId
  }: ConnectActiveCompanyPlanToCompanyUseCaseDTO) {
    return this.prisma.$transaction(async (prisma) => {
      const plan = await prisma.plan.findUniqueOrThrow({
        where: {
          id: planId
        },
        select: {
          id: true
        }
      })

      const company = await prisma.company.findUniqueOrThrow({
        where: {
          id: companyId
        },
        include: {
          activeCompanyPlan: true
        }
      })

      if (company.activeCompanyPlan) {
        throw new ConflictException(
          'Company already has an active company plan'
        )
      }

      const createdActiveCompanyPlan = await prisma.activeCompanyPlan.create({
        data: {
          endDate: new Date(),
          isActive: true,
          remainingDaysWithActivePlan: 30,
          startDate: new Date(),
          plan: {
            connect: {
              id: plan.id
            }
          },
          company: {
            connect: {
              id: company.id
            }
          }
        },
        select: {
          id: true
        }
      })

      return createdActiveCompanyPlan
    })
  }
}
