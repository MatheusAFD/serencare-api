import { Injectable } from '@nestjs/common'

import { PrismaService } from 'prisma/prisma.service'

import { UserEntity } from '../entities/user.entity'

@Injectable()
export class GetMeUseCase {
  constructor(private readonly prisma: PrismaService) {}

  public async execute(userId: string) {
    const currentUser = await this.prisma.user.findUnique({
      where: {
        id: userId
      },
      include: {
        role: {
          select: {
            type: true
          }
        }
      }
    })

    return new UserEntity(currentUser)
  }
}
