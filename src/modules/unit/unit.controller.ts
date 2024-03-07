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

import { UserEntity } from '../user/entities/user.entity'
import { CreateUnitDTO } from './dto/create-unit.dto'
import { UpdateUnitDTO } from './dto/update-unit.dto'
import { UnitService } from './unit.service'
import { GetAllUnitiesFromCompanyUseCase } from './use-cases/get-all-unities-from-company'

import { CurrentUser } from '@commom/decorators/user/current-user.decorator'

@ApiTags('unit')
@Controller('unit')
export class UnitController {
  constructor(
    private readonly unitService: UnitService,
    private readonly getAllUnitiesFromCompanyUseCase: GetAllUnitiesFromCompanyUseCase
  ) {}

  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: CreateUnitDTO })
  @Post()
  create(@Body() createUnitDto: CreateUnitDTO) {
    return this.unitService.create(createUnitDto)
  }

  @ApiBearerAuth('JWT-auth')
  @Get()
  findAll() {
    return this.unitService.findAll()
  }

  @ApiBearerAuth('JWT-auth')
  @Get('/by-company')
  findByCompany(@CurrentUser() user: UserEntity) {
    return this.getAllUnitiesFromCompanyUseCase.execute(user.companyId)
  }

  @ApiBearerAuth('JWT-auth')
  @Get(':id')
  @ApiParam({ name: 'id', description: 'ID from unit' })
  findOne(@Param('id') id: string) {
    return this.unitService.findOne(id)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'id', description: 'ID from unit' })
  @ApiBody({ type: UpdateUnitDTO })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUnitDto: UpdateUnitDTO) {
    return this.unitService.update(id, updateUnitDto)
  }

  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  @ApiParam({ name: 'id', description: 'ID from unit' })
  remove(@Param('id') id: string) {
    return this.unitService.remove(id)
  }
}
