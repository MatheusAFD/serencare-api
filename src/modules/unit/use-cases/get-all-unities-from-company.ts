import { Injectable } from '@nestjs/common'
import { Unit } from '@prisma/client'

import { PrismaService } from 'prisma/prisma.service'

@Injectable()
export class GetAllUnitiesFromCompanyUseCase {
  constructor(private readonly prisma: PrismaService) {}

  public async execute(companyId: string): Promise<Unit[]> {
    const unities = await this.prisma.unit.findMany({
      where: {
        companyId
      },
      include: {
        _count: {
          select: {
            room: {
              where: {
                deleted_at: null
              }
            }
          }
        }
      }
    })

    return unities
  }
}
