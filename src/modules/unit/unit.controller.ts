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
import { CurrentUser } from '@common/decorators/user/current-user.decorator'
import { Role } from '@common/enum/role.enum'

import { UserEntity } from '../user/entities/user.entity'
import { CreateUnitDTO } from './dto/create-unit.dto'
import { UpdateUnitDTO } from './dto/update-unit.dto'
import { UnitService } from './unit.service'
import { GetAllUnitiesFromCompanyUseCase } from './use-cases/get-all-unities-from-company'

@ApiTags('unit')
@Controller('unit')
export class UnitController {
  constructor(
    private readonly unitService: UnitService,
    private readonly getAllUnitiesFromCompanyUseCase: GetAllUnitiesFromCompanyUseCase
  ) {}

  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: CreateUnitDTO })
  @ApiResponse({ status: 404, description: 'Invalid credentials' })
  @ApiResponse({ status: 401, description: 'Insufficient permissions' })
  @ApiResponse({ status: 201, description: 'Created' })
  @Roles(Role.Admin, Role.SuperAdmin)
  @Post()
  create(@Body() createUnitDto: CreateUnitDTO) {
    return this.unitService.create(createUnitDto)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 404, description: 'Invalid credentials' })
  @ApiResponse({ status: 401, description: 'Insufficient permissions' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Roles(Role.SuperAdmin)
  @Get()
  findAll() {
    return this.unitService.findAll()
  }

  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 404, description: 'Invalid credentials' })
  @ApiResponse({ status: 401, description: 'Insufficient permissions' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Roles(Role.User, Role.Admin, Role.SuperAdmin)
  @Get('/by-company')
  findByCompany(@CurrentUser() user: UserEntity) {
    return this.getAllUnitiesFromCompanyUseCase.execute(user.companyId)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'id', description: 'ID from unit' })
  @ApiResponse({ status: 404, description: 'Invalid credentials' })
  @ApiResponse({ status: 401, description: 'Insufficient permissions' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Roles(Role.SuperAdmin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unitService.findOne(id)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'id', description: 'ID from unit' })
  @ApiResponse({ status: 404, description: 'Invalid credentials' })
  @ApiResponse({ status: 401, description: 'Insufficient permissions' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiBody({ type: UpdateUnitDTO })
  @Roles(Role.Admin, Role.SuperAdmin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUnitDto: UpdateUnitDTO) {
    return this.unitService.update(id, updateUnitDto)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'id', description: 'ID from unit' })
  @ApiResponse({ status: 404, description: 'Invalid credentials' })
  @ApiResponse({ status: 401, description: 'Insufficient permissions' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Roles(Role.Admin, Role.SuperAdmin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unitService.remove(id)
  }
}
