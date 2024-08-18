import { Controller, Post, Body } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger'

import { Roles } from '@common/decorators/auth/roles.decorator'
import { CurrentUser } from '@common/decorators/user/current-user.decorator'
import { Role } from '@common/enum/role.enum'

import { UserEntity } from '../user/entities/user.entity'
import { CreateEmployeeDTO } from './dto/create-employee.dto'
import { CreateEmployeeAndUserUseCase } from './use-cases/create-employee-and-user-usecase'

@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly createEmployeeAndUserUseCase: CreateEmployeeAndUserUseCase
  ) {}

  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: CreateEmployeeDTO })
  @ApiResponse({ status: 404, description: 'Invalid credentials' })
  @ApiResponse({ status: 401, description: 'Insufficient permissions' })
  @ApiResponse({ status: 201, description: 'Created' })
  @Roles(Role.Admin)
  @Post()
  create(
    @Body() createEmployeeDto: CreateEmployeeDTO,
    @CurrentUser() user: UserEntity
  ) {
    return this.createEmployeeAndUserUseCase.execute(
      createEmployeeDto,
      user.companyId
    )
  }
}
