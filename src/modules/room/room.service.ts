import { Injectable } from '@nestjs/common'

import { PrismaService } from 'prisma/prisma.service'

import { CreateRoomDto } from './dto/create-room.dto'
import { UpdateRoomDto } from './dto/update-room.dto'

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}
  async create(createRoomDto: CreateRoomDto) {
    return await this.prisma.room.create({
      data: {
        ...createRoomDto,
        unit: {
          connect: {
            id: createRoomDto.unityId
          }
        }
      }
    })
  }

  async findAll() {
    return await this.prisma.room.findMany()
  }

  async findOne(id: string) {
    return await this.prisma.room.findUnique({
      where: {
        id
      }
    })
  }

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    return await this.prisma.room.update({
      data: updateRoomDto,
      where: {
        id
      }
    })
  }

  async remove(id: string) {
    return await this.prisma.room.update({
      data: {
        deleted_at: new Date()
      },
      where: {
        id
      }
    })
  }
}
