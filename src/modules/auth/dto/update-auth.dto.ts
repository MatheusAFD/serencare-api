import { PartialType } from '@nestjs/mapped-types'

import { CreateAuthDTO } from './create-auth.dto'

export class UpdateAuthDto extends PartialType(CreateAuthDTO) {}
