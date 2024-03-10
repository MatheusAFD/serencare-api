import { Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { PrismaService } from 'prisma/prisma.service'

import { AuthEntity } from './entities/auth.entity'

import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async signin(email: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        role: {
          select: {
            type: true
          }
        }
      }
    })

    if (!user) {
      throw new NotFoundException('Invalid credentials')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      throw new NotFoundException('Invalid credentials')
    }

    return {
      accessToken: this.jwtService.sign({
        id: user.id,
        role: user.role,
        companyId: user.companyId
      })
    }
  }
}
