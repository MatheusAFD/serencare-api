import { Body, Controller, Post } from '@nestjs/common'

import { AuthService } from './auth.service'
import { LoginDTO } from './dto/login.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() { email, password }: LoginDTO) {
    return this.authService.login(email, password)
  }
}
