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
  ApiParam,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'

import { Roles } from '@common/decorators/auth/roles.decorator'
import { Role } from '@common/enum/role.enum'

import { CreateRoomDTO } from './dto/create-room.dto'
import { UpdateRoomDTO } from './dto/update-room.dto'
import { RoomService } from './room.service'

@ApiTags('room')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: CreateRoomDTO })
  @ApiResponse({ status: 404, description: 'Invalid credentials' })
  @ApiResponse({ status: 401, description: 'Insufficient permissions' })
  @ApiResponse({ status: 201, description: 'Created' })
  @Roles(Role.Admin, Role.SuperAdmin)
  @Post()
  create(@Body() createRoomDto: CreateRoomDTO) {
    return this.roomService.create(createRoomDto)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 404, description: 'Invalid credentials' })
  @ApiResponse({ status: 401, description: 'Insufficient permissions' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Roles(Role.SuperAdmin)
  @Get()
  findAll() {
    return this.roomService.findAll()
  }

  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'id', description: 'ID from room' })
  @ApiResponse({ status: 404, description: 'Invalid credentials' })
  @ApiResponse({ status: 401, description: 'Insufficient permissions' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Roles(Role.User, Role.Admin, Role.SuperAdmin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(id)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'id', description: 'ID from room' })
  @ApiBody({ type: UpdateRoomDTO })
  @ApiResponse({ status: 404, description: 'Invalid credentials' })
  @ApiResponse({ status: 401, description: 'Insufficient permissions' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Roles(Role.Admin, Role.SuperAdmin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDTO) {
    return this.roomService.update(id, updateRoomDto)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'id', description: 'ID from room' })
  @ApiResponse({ status: 404, description: 'Invalid credentials' })
  @ApiResponse({ status: 401, description: 'Insufficient permissions' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Roles(Role.Admin, Role.SuperAdmin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomService.remove(id)
  }
}
