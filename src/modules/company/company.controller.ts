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

import { Public } from '@common/decorators/auth/public-route'
import { Roles } from '@common/decorators/auth/roles.decorator'
import { Role } from '@common/enum/role.enum'

import { CompanyService } from './company.service'
import { CreateCompanyAndUserDTO } from './dto/create-company-and-user.dto'
import { UpdateCompanyDTO } from './dto/update-company.dto'
import { CreateCompanyWithMainAdminUserUseCase } from './use-cases/create-company-with-main-admin-user-usecase'

@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly createCompanyWithMainAdminUserUseCase: CreateCompanyWithMainAdminUserUseCase
  ) {}

  @Public()
  @ApiBody({ type: CreateCompanyAndUserDTO })
  @ApiResponse({ status: 201, description: 'Created' })
  @Post('/company-user')
  createCompanyWithUser(
    @Body() createCompanyAndUserDTO: CreateCompanyAndUserDTO
  ) {
    return this.createCompanyWithMainAdminUserUseCase.execute(
      createCompanyAndUserDTO
    )
  }

  @ApiBearerAuth('JWT-auth')
  @Get()
  findAll() {
    return this.companyService.findAll()
  }

  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'id', description: 'ID from company' })
  @ApiResponse({ status: 404, description: 'Invalid credentials' })
  @ApiResponse({ status: 401, description: 'Insufficient permissions' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Roles(Role.SuperAdmin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(id)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'id', description: 'ID from company' })
  @ApiBody({ type: UpdateCompanyDTO })
  @ApiResponse({ status: 404, description: 'Invalid credentials' })
  @ApiResponse({ status: 401, description: 'Insufficient permissions' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Roles(Role.Admin, Role.SuperAdmin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDTO: UpdateCompanyDTO) {
    return this.companyService.update(id, updateCompanyDTO)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'id', description: 'ID from company' })
  @ApiResponse({ status: 404, description: 'Invalid credentials' })
  @ApiResponse({ status: 401, description: 'Insufficient permissions' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Roles(Role.SuperAdmin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(id)
  }
}
