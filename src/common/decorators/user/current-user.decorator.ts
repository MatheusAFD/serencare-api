import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { UserEntity } from 'src/modules/user/entities/user.entity'

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()

    return new UserEntity(request.user)
  }
)
