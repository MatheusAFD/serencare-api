import { BaseDTO } from 'src/modules/base.dto'

export class UserDTO extends BaseDTO {
  id: string
  name: string
  email: string
}
