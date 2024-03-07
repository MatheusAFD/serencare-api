import { Injectable } from '@nestjs/common'

import { PrismaService } from 'prisma/prisma.service'

import { CreateRoomDTO } from './dto/create-room.dto'
import { UpdateRoomDTO } from './dto/update-room.dto'

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}
  async create(createRoomDto: CreateRoomDTO) {
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

  async update(id: string, updateRoomDto: UpdateRoomDTO) {
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
