import { Module } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'

import { PrismaService } from 'prisma/prisma.service'

import { ActiveCompanyPlanController } from './active-company-plan.controller'
import { ActiveCompanyPlanService } from './active-company-plan.service'
import { ConnectActiveCompanyPlanToCompanyUseCase } from './use-cases'

@Module({
  controllers: [ActiveCompanyPlanController],
  providers: [
    ActiveCompanyPlanService,
    PrismaService,
    JwtService,
    Reflector,
    ConnectActiveCompanyPlanToCompanyUseCase
  ]
})
export class ActiveCompanyPlanModule {}
