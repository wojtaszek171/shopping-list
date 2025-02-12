import { Controller, Post, Body, Req, Get, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { SkipJwtAuthGuard } from './jwt-skip.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipJwtAuthGuard()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @SkipJwtAuthGuard()
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    return this.authService.login(loginDto, res);
  }

  @Post('logout')
  logout(@Res() res: Response) {
    // Clear the cookie on logout
    res.clearCookie('jwt');
    return res.send({ message: 'Logout successful' });
  }

  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
