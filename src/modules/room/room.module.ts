import { Module } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'

import { PrismaService } from 'prisma/prisma.service'

import { RoomController } from './room.controller'
import { RoomService } from './room.service'

@Module({
  controllers: [RoomController],
  providers: [RoomService, PrismaService, JwtService, Reflector]
})
export class RoomModule {}
