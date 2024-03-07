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

import { CreateRoomDTO } from './dto/create-room.dto'
import { UpdateRoomDTO } from './dto/update-room.dto'
import { RoomService } from './room.service'

@ApiTags('room')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @ApiBearerAuth('JWT-auth')
  @Post()
  @ApiBody({ type: CreateRoomDTO })
  create(@Body() createRoomDto: CreateRoomDTO) {
    return this.roomService.create(createRoomDto)
  }

  @ApiBearerAuth('JWT-auth')
  @Get()
  findAll() {
    return this.roomService.findAll()
  }

  @ApiBearerAuth('JWT-auth')
  @Get(':id')
  @ApiParam({ name: 'id', description: 'ID from room' })
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(id)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'id', description: 'ID from room' })
  @ApiBody({ type: UpdateRoomDTO })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDTO) {
    return this.roomService.update(id, updateRoomDto)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'id', description: 'ID from room' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomService.remove(id)
  }
}
