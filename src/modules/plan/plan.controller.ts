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

import { CreatePlanDTO } from './dto/create-plan.dto'
import { UpdatePlanDTO } from './dto/update-plan.dto'
import { PlanService } from './plan.service'

@ApiTags('plan')
@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'id', description: 'ID from plan' })
  @ApiBody({ type: CreatePlanDTO })
  @ApiResponse({ status: 404, description: 'Invalid credentials' })
  @ApiResponse({ status: 401, description: 'Insufficient permissions' })
  @ApiResponse({ status: 201, description: 'Created' })
  @Roles(Role.SuperAdmin)
  @Post()
  create(@Body() createPlanDto: CreatePlanDTO) {
    return this.planService.create(createPlanDto)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 404, description: 'Invalid credentials' })
  @ApiResponse({ status: 401, description: 'Insufficient permissions' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Roles(Role.SuperAdmin)
  @Get()
  findAll() {
    return this.planService.findAll()
  }

  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'id', description: 'ID from plan' })
  @ApiResponse({ status: 404, description: 'Invalid credentials' })
  @ApiResponse({ status: 401, description: 'Insufficient permissions' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Roles(Role.SuperAdmin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planService.findOne(id)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'id', description: 'ID from plan' })
  @ApiBody({ type: UpdatePlanDTO })
  @ApiResponse({ status: 404, description: 'Invalid credentials' })
  @ApiResponse({ status: 401, description: 'Insufficient permissions' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Roles(Role.Admin, Role.SuperAdmin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanDto: UpdatePlanDTO) {
    return this.planService.update(id, updatePlanDto)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'id', description: 'ID from plan' })
  @ApiResponse({ status: 404, description: 'Invalid credentials' })
  @ApiResponse({ status: 401, description: 'Insufficient permissions' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Roles(Role.SuperAdmin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planService.remove(id)
  }
}
