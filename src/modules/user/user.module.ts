import { Module } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'

import { PrismaService } from 'prisma/prisma.service'

import { GetMeUseCase } from './use-cases/get-me-usecase'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtService, Reflector, GetMeUseCase]
})
export class UserModule {}
