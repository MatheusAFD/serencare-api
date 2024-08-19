import {
  Injectable,
  ExecutionContext,
  UnauthorizedException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'

import { IS_PUBLIC_KEY } from 'src/common/decorators/auth/public-route'
import { ROLES_KEY } from 'src/common/decorators/auth/roles.decorator'
import { Role } from 'src/common/enum/role.enum'

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (isPublic) {
      return true
    }

    const { user } = context.switchToHttp().getRequest()

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (!requiredRoles) {
      return true
    }

    const hasRequiredRole = requiredRoles.some((requiredRole) => {
      return user.role.some((userRole) => userRole.type === requiredRole)
    })

    if (!hasRequiredRole) {
      throw new UnauthorizedException('Insufficient permissions')
    }

    return true
  }
}
