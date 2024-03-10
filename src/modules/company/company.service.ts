import { Injectable } from '@nestjs/common'

import { PrismaService } from 'prisma/prisma.service'

import { UpdateCompanyDTO } from './dto/update-company.dto'

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const companies = await this.prisma.company.findMany()

    return companies
  }

  findOne(id: string) {
    const company = this.prisma.company.findUnique({
      where: {
        id
      }
    })

    return company
  }

  async update(id: string, updateCompanyDTO: UpdateCompanyDTO) {
    await this.prisma.company.update({
      data: updateCompanyDTO,
      where: {
        id
      },
      select: {
        id: true
      }
    })
  }

  async remove(id: string) {
    await this.prisma.company.update({
      data: {
        deleted_at: new Date()
      },
      where: {
        id
      },
      select: {
        id: true
      }
    })
  }
}
