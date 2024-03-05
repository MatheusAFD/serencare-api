import { BaseDTO } from 'src/modules/base.dto'

import { Exclude } from 'class-transformer'
export class User extends BaseDTO {
  name: string
  email: string

  @Exclude()
  password: string

  constructor(partial: Partial<User>) {
    super()
    Object.assign(this, partial)
  }
}
