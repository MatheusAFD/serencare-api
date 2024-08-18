import { Module } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'

import { PrismaService } from 'prisma/prisma.service'

import { EmployeeController } from './employee.controller'
import { CreateEmployeeAndUserUseCase } from './use-cases/create-employee-and-user-usecase'

@Module({
  controllers: [EmployeeController],
  providers: [
    PrismaService,
    JwtService,
    Reflector,
    CreateEmployeeAndUserUseCase
  ]
})
export class EmployeeModule {}
