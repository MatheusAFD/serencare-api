import { Module } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'

import { PrismaService } from 'prisma/prisma.service'

import { UnitController } from './unit.controller'
import { UnitService } from './unit.service'
import { GetAllUnitiesFromCompanyUseCase } from './use-cases/get-all-unities-from-company'

@Module({
  controllers: [UnitController],
  providers: [
    UnitService,
    PrismaService,
    JwtService,
    Reflector,
    GetAllUnitiesFromCompanyUseCase
  ]
})
export class UnitModule {}
