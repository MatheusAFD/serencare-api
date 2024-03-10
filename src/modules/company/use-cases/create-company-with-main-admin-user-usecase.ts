import { Injectable } from '@nestjs/common'

import { PrismaService } from 'prisma/prisma.service'

import { encryptData } from '@common/utils/encrypt-data'

import { CreateCompanyAndUserDTO } from '../dto/create-company-and-user.dto'

import { addDays } from 'date-fns'

@Injectable()
export class CreateCompanyWithMainAdminUserUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(createCompanyAndUserDTO: CreateCompanyAndUserDTO) {
    const adminRole = await this.prisma.role.findUniqueOrThrow({
      where: {
        type: 'ADMIN'
      },
      select: {
        id: true
      }
    })

    const plan = await this.prisma.plan.findUniqueOrThrow({
      where: {
        id: createCompanyAndUserDTO.planId
      }
    })

    const hashedPassword = await encryptData(createCompanyAndUserDTO.password)

    const companyWithAdminUser = await this.prisma.company.create({
      data: {
        name: createCompanyAndUserDTO.name,
        isActive: false,
        cnpj: createCompanyAndUserDTO.cnpj,
        activeCompanyPlan: {
          create: {
            planId: createCompanyAndUserDTO.planId,
            isActive: false,
            remainingDaysWithActivePlan: plan.duration,
            startDate: new Date(),
            endDate: addDays(new Date(), plan.duration)
          }
        },
        users: {
          create: {
            email: createCompanyAndUserDTO.email,
            name: createCompanyAndUserDTO.userName,
            password: hashedPassword,
            role: {
              connect: {
                id: adminRole.id
              }
            }
          }
        }
      },
      select: {
        id: true
      }
    })

    return companyWithAdminUser
  }
}
