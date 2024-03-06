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
import { UserEntity } from './entities/user.entity'
import { GetMeUseCase } from './use-cases/get-me-usecase'
import { UserService } from './user.service'

import { Public } from '@commom/decorators/auth/public-route'
import { CurrentUser } from '@commom/decorators/user/current-user.decorator'

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly getMeUseCase: GetMeUseCase
  ) {}

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

  @Get('get-me')
  async getCurrentUser(@CurrentUser() user: UserEntity) {
    return this.getMeUseCase.execute(user.id)
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
