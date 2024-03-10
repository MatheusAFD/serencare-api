import { Module } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'

import { PrismaService } from 'prisma/prisma.service'

import { ActiveCompanyPlanController } from './active-company-plan.controller'
import { ActiveCompanyPlanService } from './active-company-plan.service'

@Module({
  controllers: [ActiveCompanyPlanController],
  providers: [ActiveCompanyPlanService, PrismaService, JwtService, Reflector]
})
export class ActiveCompanyPlanModule {}
