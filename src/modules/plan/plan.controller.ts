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

import { CreatePlanDTO } from './dto/create-plan.dto'
import { UpdatePlanDTO } from './dto/update-plan.dto'
import { PlanService } from './plan.service'

import { Roles } from '@commom/decorators/auth/roles.decorator'
import { Role } from '@commom/enum/role.enum'

@ApiTags('plan')
@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'id', description: 'ID from plan' })
  @ApiBody({ type: CreatePlanDTO })
  @Roles(Role.SuperAdmin)
  @Post()
  create(@Body() createPlanDto: CreatePlanDTO) {
    return this.planService.create(createPlanDto)
  }

  @ApiBearerAuth('JWT-auth')
  @Roles(Role.SuperAdmin)
  @Get()
  findAll() {
    return this.planService.findAll()
  }

  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'id', description: 'ID from plan' })
  @Roles(Role.SuperAdmin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planService.findOne(id)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'id', description: 'ID from plan' })
  @ApiBody({ type: UpdatePlanDTO })
  @Roles(Role.SuperAdmin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanDto: UpdatePlanDTO) {
    return this.planService.update(id, updatePlanDto)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'id', description: 'ID from plan' })
  @Roles(Role.SuperAdmin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planService.remove(id)
  }
}
