import { Injectable, NotFoundException } from '@nestjs/common'

import { PrismaService } from 'prisma/prisma.service'

import { CreateUserDTO } from './dto/create-user.dto'
import { UpdateUserDTO } from './dto/update-user.dto'
import { UserEntity } from './entities/user.entity'

import * as bcrypt from 'bcrypt'

export const roundsOfHashing = 10

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany({
      include: {
        company: {
          select: {
            name: true
          }
        },
        role: {
          select: {
            type: true
          }
        }
      }
    })

    return users.map((user) => new UserEntity(user))
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: { id }
    })

    if (!user) {
      throw new NotFoundException(`User not found!`)
    }

    return new UserEntity(user)
  }

  async create(createUserDto: CreateUserDTO) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing
    )

    createUserDto.password = hashedPassword

    const newUser = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        password: createUserDto.password,
        role: {
          connect: {
            id: createUserDto.roleId
          }
        },
        company: {
          connect: {
            id: createUserDto.companyId
          }
        }
      },
      select: {
        id: true
      }
    })

    return newUser
  }

  async update(id: string, updateUserDTO: UpdateUserDTO) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDTO,
      select: {
        id: true
      }
    })
  }

  async remove(id: string) {
    await this.prisma.user.update({
      where: { id },
      data: { deleted_at: new Date() },
      select: {
        id: true
      }
    })
  }
}
