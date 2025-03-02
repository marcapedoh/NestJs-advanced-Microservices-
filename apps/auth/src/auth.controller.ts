import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserDocument } from './users/models/user.schema';
import { Response } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@CurrentUser() user: UserDocument, @Res({ passthrough: true }) response: Response) {
    await this.authService.login(user, response);
    response.send(user);
  }

  @MessagePattern("authenticate")
  @UseGuards(JwtAuthGuard)
  async authenticate(@Payload() data: any) {
    return data.user
  }

}
