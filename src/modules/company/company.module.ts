import { Module } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'

import { PrismaService } from 'prisma/prisma.service'

import { CompanyController } from './company.controller'
import { CompanyService } from './company.service'

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, PrismaService, JwtService, Reflector]
})
export class CompanyModule {}
