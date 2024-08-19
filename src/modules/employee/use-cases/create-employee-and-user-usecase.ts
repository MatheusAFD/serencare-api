import { Injectable } from '@nestjs/common'

import { PrismaService } from 'prisma/prisma.service'

import { encryptData } from '@common/utils/encrypt-data'

import { CreateEmployeeDTO } from '../dto/create-employee.dto'

@Injectable()
export class CreateEmployeeAndUserUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(createEmployeeDto: CreateEmployeeDTO, companyId: string) {
    return this.createEmployeeAndUser(createEmployeeDto, companyId)
  }

  private async createEmployeeAndUser(
    createEmployeeDto: CreateEmployeeDTO,
    companyId: string
  ) {
    const userRole = await this.prisma.role.findUniqueOrThrow({
      where: {
        type: 'USER'
      },
      select: {
        id: true
      }
    })

    const hashedPassword = await encryptData(createEmployeeDto.password)

    return await this.prisma.employee.create({
      data: {
        name: createEmployeeDto.name,
        color: createEmployeeDto.color,
        status: 'active',
        user: {
          create: {
            name: createEmployeeDto.name,
            email: createEmployeeDto.email,
            password: hashedPassword,
            birthday: createEmployeeDto.birthday ?? null,
            company: {
              connect: {
                id: companyId
              }
            },
            role: {
              connect: {
                id: userRole.id
              }
            }
          }
        },
        company: {
          connect: {
            id: companyId
          }
        }
      }
    })
  }
}
