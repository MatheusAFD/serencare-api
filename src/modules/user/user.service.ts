import { Injectable, NotFoundException } from '@nestjs/common'

import { PrismaService } from 'prisma/prisma.service'

import { CreateUserDTO } from './dto/create-user.dto'
import { UpdateUserDTO } from './dto/update-user.dto'
import { User } from './entities/user.entity'

import * as bcrypt from 'bcrypt'

export const roundsOfHashing = 10

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

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
        password: createUserDto.password
      }
    })

    return newUser
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany()

    return users.map((user) => new User(user))
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id }
    })

    if (!user) {
      throw new NotFoundException(`User not found!`)
    }

    return new User(user)
  }

  async update(id: string, updateUserDto: UpdateUserDTO) {
    const userToUpdate = await this.prisma.user.findUnique({
      where: { id: id }
    })

    if (!userToUpdate) {
      throw new NotFoundException(`User not found!`)
    }

    const updatedUser = {
      name: updateUserDto.name ?? userToUpdate.name,
      email: updateUserDto.email ?? userToUpdate.email
    }

    return this.prisma.user.update({
      where: { id },
      data: updatedUser,
      select: {
        id: true
      }
    })
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
