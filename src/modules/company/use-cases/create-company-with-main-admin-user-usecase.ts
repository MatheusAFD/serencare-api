import { Injectable } from '@nestjs/common'

import { PrismaService } from 'prisma/prisma.service'

import { encryptData } from '@common/utils/encrypt-data'

import { CreateCompanyAndUserDTO } from '../dto/create-company-and-user.dto'

@Injectable()
export class CreateCompanyWithMainAdminUserUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(createCompanyAndUserDTO: CreateCompanyAndUserDTO) {
    const hashedPassword = await encryptData(createCompanyAndUserDTO.password)

    const companyWithAdminUser = await this.prisma.company.create({
      data: {
        name: createCompanyAndUserDTO.name,
        isActive: false,
        cnpj: createCompanyAndUserDTO.cnpj,
        users: {
          create: {
            email: createCompanyAndUserDTO.email,
            name: createCompanyAndUserDTO.userName,
            password: hashedPassword,
            roles: {
              connect: {
                type: 'SUPER_ADMIN'
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
