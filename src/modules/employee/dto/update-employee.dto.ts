import { PartialType } from '@nestjs/swagger'

import { CreateEmployeeDTO } from './create-employee.dto'

export class UpdateEmployeeDTO extends PartialType(CreateEmployeeDTO) {}
