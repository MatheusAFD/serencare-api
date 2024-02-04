import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
