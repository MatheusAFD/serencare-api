import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger'

import { CreateUserDTO } from './dto/create-user.dto'
import { UpdateUserDTO } from './dto/update-user.dto'
import { UserEntity } from './entities/user.entity'
import { GetMeUseCase } from './use-cases/get-me-usecase'
import { UserService } from './user.service'

import { Roles } from '@commom/decorators/auth/roles.decorator'
import { CurrentUser } from '@commom/decorators/user/current-user.decorator'
import { Role } from '@commom/enum/role.enum'

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly getMeUseCase: GetMeUseCase
  ) {}

  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: CreateUserDTO })
  @Post()
  create(@Body() createUserDto: CreateUserDTO) {
    return this.userService.create(createUserDto)
  }

  @Get()
  @ApiBearerAuth('JWT-auth')
  async findAll() {
    return this.userService.findAll()
  }

  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'id', description: 'ID from user' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id)
  }

  @ApiBearerAuth('JWT-auth')
  @Roles(Role.User, Role.Admin, Role.SuperAdmin)
  @Get('get-me')
  async getCurrentUser(@CurrentUser() user: UserEntity) {
    return this.getMeUseCase.execute(user.id)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'id', description: 'ID from user' })
  @ApiBody({ type: UpdateUserDTO })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDTO) {
    return await this.userService.update(id, updateUserDto)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'id', description: 'ID from user' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id)
  }
}
