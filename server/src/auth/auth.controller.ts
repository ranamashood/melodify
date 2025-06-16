import { Controller, Request, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/utils/constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.body.user);
  }

  @Public()
  @Post('register')
  async register(@Request() req) {
    return this.authService.register(req.body.user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
