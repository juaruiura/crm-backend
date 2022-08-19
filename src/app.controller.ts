import { Controller, Post, UseGuards, Body, Get, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { User } from 'src/users/user.model';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {

  constructor(private authService: AuthService) { }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Body() user: User) {
    return this.authService.login(user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
