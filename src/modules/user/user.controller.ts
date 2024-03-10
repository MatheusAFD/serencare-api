import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'

import { Roles } from '@common/decorators/auth/roles.decorator'
import { CurrentUser } from '@common/decorators/user/current-user.decorator'
import { Role } from '@common/enum/role.enum'

import { CreateUserDTO } from './dto/create-user.dto'
import { UpdateUserDTO } from './dto/update-user.dto'
import { UserEntity } from './entities/user.entity'
import { GetMeUseCase } from './use-cases/get-me-usecase'
import { UserService } from './user.service'

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly getMeUseCase: GetMeUseCase
  ) {}

  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: CreateUserDTO })
  @ApiResponse({ status: 404, description: 'Invalid credentials' })
  @ApiResponse({ status: 401, description: 'Insufficient permissions' })
  @ApiResponse({ status: 201, description: 'Created' })
  @Roles(Role.SuperAdmin)
  @Post()
  create(@Body() createUserDto: CreateUserDTO) {
    return this.userService.create(createUserDto)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 404, description: 'Invalid credentials' })
  @ApiResponse({ status: 401, description: 'Insufficient permissions' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Roles(Role.SuperAdmin)
  @Get()
  async findAll() {
    return this.userService.findAll()
  }

  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 404, description: 'Invalid credentials' })
  @ApiResponse({ status: 401, description: 'Insufficient permissions' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Roles(Role.SuperAdmin)
  @ApiParam({ name: 'id', description: 'ID from user' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ description: 'Return signed user data' })
  @ApiResponse({ status: 404, description: 'Invalid credentials' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Roles(Role.User, Role.Admin, Role.SuperAdmin)
  @Get('get-me')
  async getCurrentUser(@CurrentUser() user: UserEntity) {
    return this.getMeUseCase.execute(user.id)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 404, description: 'Invalid credentials' })
  @ApiResponse({ status: 401, description: 'Insufficient permissions' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Roles(Role.SuperAdmin)
  @ApiParam({ name: 'id', description: 'ID from user' })
  @ApiBody({ type: UpdateUserDTO })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDTO) {
    return await this.userService.update(id, updateUserDto)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 404, description: 'Invalid credentials' })
  @ApiResponse({ status: 401, description: 'Insufficient permissions' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Roles(Role.SuperAdmin)
  @ApiParam({ name: 'id', description: 'ID from user' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id)
  }
}
