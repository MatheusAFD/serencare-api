import { Injectable } from '@nestjs/common'

import { PrismaService } from 'prisma/prisma.service'

import { CreateUnitDto } from './dto/create-unit.dto'
import { UpdateUnitDto } from './dto/update-unit.dto'

@Injectable()
export class UnitService {
  constructor(private prisma: PrismaService) {}

  async create(createUnitDto: CreateUnitDto) {
    return await this.prisma.unit.create({
      data: {
        city: createUnitDto.city,
        number: createUnitDto.number,
        state: createUnitDto.state,
        status: createUnitDto.status,
        zipcode: createUnitDto.zipcode,
        company: {
          connect: {
            id: createUnitDto.companyId
          }
        }
      }
    })
  }

  async findAll() {
    return await this.prisma.unit.findMany()
  }

  async findOne(id: string) {
    return await this.prisma.unit.findUnique({
      where: {
        id
      }
    })
  }

  async update(id: string, updateUnitDto: UpdateUnitDto) {
    return this.prisma.unit.update({
      data: {
        city: updateUnitDto.city,
        status: updateUnitDto.status,
        state: updateUnitDto.state,
        zipcode: updateUnitDto.zipcode
      },
      where: {
        id
      }
    })
  }

  async remove(id: string) {
    return await this.prisma.unit.update({
      data: {
        deleted_at: new Date()
      },
      where: {
        id
      }
    })
  }
}
