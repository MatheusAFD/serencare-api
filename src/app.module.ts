import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD, Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'

import { AuthModule } from './modules/auth/auth.module'
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard'
import { RolesGuard } from './modules/auth/role.guard'
import { UserModule } from './modules/user/user.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UnitModule } from './modules/unit/unit.module';
import { RoomModule } from './modules/room/room.module';
import { CompanyModule } from './modules/company/company.module';
import { PlanModule } from './modules/plan/plan.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, UnitModule, RoomModule, CompanyModule, PlanModule],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    Reflector,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class AppModule {}
