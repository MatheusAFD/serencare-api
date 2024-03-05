import { Module } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'

import { PrismaService } from 'prisma/prisma.service'

import { UnitController } from './unit.controller'
import { UnitService } from './unit.service'

@Module({
  controllers: [UnitController],
  providers: [UnitService, PrismaService, JwtService, Reflector]
})
export class UnitModule {}
