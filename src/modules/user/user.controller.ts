import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'

import { CreateUserDTO } from './dto/create-user.dto'
import { UpdateUserDTO } from './dto/update-user.dto'
import { UserService } from './user.service'

import { Public } from '@commom/decorators/auth/public-route'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDTO) {
    return this.userService.create(createUserDto)
  }

  @Get()
  async findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDTO) {
    return await this.userService.update(id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id)
  }
}
