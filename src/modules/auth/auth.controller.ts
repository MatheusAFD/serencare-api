import { Body, Controller, Post } from '@nestjs/common'
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { LoginDTO } from './dto/login.dto'
import { AuthEntity } from './entities/auth.entity'

import { Public } from '@commom/decorators/auth/public-route'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiBody({ type: LoginDTO })
  @ApiResponse({ type: AuthEntity })
  @Post('/signin')
  login(@Body() { email, password }: LoginDTO) {
    return this.authService.signin(email, password)
  }
}
