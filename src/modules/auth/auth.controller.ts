import { Body, Controller, Post } from '@nestjs/common'

import { AuthService } from './auth.service'
import { LoginDTO } from './dto/login.dto'

import { Public } from '@commom/decorators/auth/public-route'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  @Public()
  login(@Body() { email, password }: LoginDTO) {
    return this.authService.signin(email, password)
  }
}
