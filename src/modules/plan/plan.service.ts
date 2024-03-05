import { Injectable } from '@nestjs/common'
import { Plan } from '@prisma/client'

import { PrismaService } from 'prisma/prisma.service'

import { CreatePlanDto } from './dto/create-plan.dto'
import { UpdatePlanDto } from './dto/update-plan.dto'

@Injectable()
export class PlanService {
  constructor(private prisma: PrismaService) {}

  async create(createPlanDto: CreatePlanDto): Promise<Plan> {
    return await this.prisma.plan.create({
      data: createPlanDto
    })
  }

  async findAll(): Promise<Plan[]> {
    return await this.prisma.plan.findMany()
  }

  async findOne(id: string): Promise<Plan> {
    return await this.prisma.plan.findUnique({
      where: {
        id
      }
    })
  }

  async update(id: string, updatePlanDto: UpdatePlanDto): Promise<Plan> {
    return await this.prisma.plan.update({
      data: updatePlanDto,
      where: {
        id
      }
    })
  }

  async remove(id: string) {
    return await this.prisma.plan.update({
      data: {
        deleted_at: new Date()
      },
      where: {
        id
      }
    })
  }
}
