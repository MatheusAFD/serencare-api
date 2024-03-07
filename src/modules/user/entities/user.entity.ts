import { User } from '@prisma/client'

import { BaseDTO } from 'src/modules/base.dto'

import { Exclude } from 'class-transformer'
export class UserEntity extends BaseDTO {
  @Exclude()
  password: string

  companyId: string

  constructor(partial: Partial<User>) {
    super()
    Object.assign(this, partial)
  }
}
