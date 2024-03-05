import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'

import { CompanyService } from './company.service'
import { CreateCompanyDTO } from './dto/create-company.dto'
import { UpdateCompanyDTO } from './dto/update-company.dto'

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  create(@Body() createCompanyDTO: CreateCompanyDTO) {
    return this.companyService.create(createCompanyDTO)
  }

  @Get()
  findAll() {
    return this.companyService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDTO: UpdateCompanyDTO) {
    return this.companyService.update(id, updateCompanyDTO)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(id)
  }
}
