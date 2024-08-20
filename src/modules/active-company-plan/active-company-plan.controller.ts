import { Body, Controller, Get, Post } from '@nestjs/common'
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
import { ConnectActiveCompanyPlanToCompanyUseCaseDTO } from './dto'
import { ConnectActiveCompanyPlanToCompanyUseCase } from './use-cases'

@ApiTags('active-company-plan')
@Controller('active-company-plan')
export class ActiveCompanyPlanController {
  constructor(
    private readonly activeCompanyPlanService: ActiveCompanyPlanService,
    private readonly connectActiveCompanyPlanToCompanyUseCase: ConnectActiveCompanyPlanToCompanyUseCase
  ) {}

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ description: 'Return active company data from signed user' })
  @ApiResponse({ status: 404, description: 'Invalid credentials' })
  @ApiResponse({ status: 401, description: 'Insufficient permissions' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Roles(Role.User, Role.Admin, Role.SuperAdmin)
  @Get()
  findMeActiveCompanyPlan(@CurrentUser() user: UserEntity) {
    return this.activeCompanyPlanService.findActiveCompanyPlanByFromCompany(
      user.companyId
    )
  }

  @Roles(Role.User, Role.Admin, Role.SuperAdmin)
  @Post('/connect-plan')
  connectActiveCompanyPlan(
    @Body() body: ConnectActiveCompanyPlanToCompanyUseCaseDTO
  ) {
    return this.connectActiveCompanyPlanToCompanyUseCase.execute(body)
  }
}
