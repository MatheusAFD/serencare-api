import { BaseDTO } from 'src/modules/base.dto'

import { IsEmail, IsString, MinLength } from 'class-validator'

export class CreateUserDTO extends BaseDTO {
  @IsEmail()
  email: string

  @IsString()
  @MinLength(4)
  name: string

  @IsString()
  password: string
}
