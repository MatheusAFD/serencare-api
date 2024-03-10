import { Controller, Get } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'

import { Roles } from '@common/decorators/auth/roles.decorator'
import { CurrentUser } from '@common/decorators/user/current-user.decorator'
import { Role } from '@common/enum/role.enum'

import { UserEntity } from '../user/entities/user.entity'
import { ActiveCompanyPlanService } from './active-company-plan.service'

@ApiTags('active-company-plan')
@Controller('active-company-plan')
export class ActiveCompanyPlanController {
  constructor(
    private readonly activeCompanyPlanService: ActiveCompanyPlanService
  ) {}

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ description: 'Return active company data from signed user' })
  @ApiResponse({ status: 404, description: 'Invalid credentials' })
  @ApiResponse({ status: 401, description: 'Insufficient permissions' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Roles(Role.User, Role.Admin)
  @Get()
  findMeActiveCompanyPlan(@CurrentUser() user: UserEntity) {
    return this.activeCompanyPlanService.findMeActiveCompanyPlan(user.companyId)
  }
}
