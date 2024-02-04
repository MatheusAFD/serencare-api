import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

import { PrismaService } from 'prisma/prisma.service'

import { UserService } from '../user/user.service'

import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private usersService: UserService,
    private prisma: PrismaService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    })
  }

  async validate(payload: { userId: string }) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.userId }
    })

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
