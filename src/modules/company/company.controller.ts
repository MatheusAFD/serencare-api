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

import { CompanyService } from './company.service'
import { CreateCompanyDTO } from './dto/create-company.dto'
import { UpdateCompanyDTO } from './dto/update-company.dto'

import { Roles } from '@commom/decorators/auth/roles.decorator'
import { Role } from '@commom/enum/role.enum'

@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: CreateCompanyDTO })
  @Post()
  create(@Body() createCompanyDTO: CreateCompanyDTO) {
    return this.companyService.create(createCompanyDTO)
  }

  @ApiBearerAuth('JWT-auth')
  @Get()
  findAll() {
    return this.companyService.findAll()
  }

  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'id', description: 'ID from company' })
  @Roles(Role.SuperAdmin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(id)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'id', description: 'ID from company' })
  @ApiBody({ type: UpdateCompanyDTO })
  @Roles(Role.SuperAdmin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDTO: UpdateCompanyDTO) {
    return this.companyService.update(id, updateCompanyDTO)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'id', description: 'ID from company' })
  @Roles(Role.SuperAdmin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(id)
  }
}
