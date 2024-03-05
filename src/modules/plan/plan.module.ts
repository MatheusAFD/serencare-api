import { Module } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'

import { PrismaService } from 'prisma/prisma.service'

import { PlanController } from './plan.controller'
import { PlanService } from './plan.service'

@Module({
  controllers: [PlanController],
  providers: [PlanService, PrismaService, JwtService, Reflector]
})
export class PlanModule {}
