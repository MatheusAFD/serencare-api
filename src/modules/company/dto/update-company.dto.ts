import { PartialType } from '@nestjs/mapped-types'

import { CreateCompanyDTO } from './create-company.dto'

export class UpdateCompanyDTO extends PartialType(CreateCompanyDTO) {}
