import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    return this.userService.create({
      ...registerDto,
      password: hashedPassword
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(loginDto: LoginDto, res: Response) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    const payload = { sub: user._id, email: user.email };
    const token = this.jwtService.sign(payload);

    res.cookie('jwt', token, {
      path: '/', // Cookie is accessible from all paths
      expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
      secure: true, // Cookie will only be sent over HTTPS in production
      httpOnly: true, // Cookie cannot be accessed via client-side scripts
      sameSite: 'none'
    });

    return res.send({
      message: 'Login successful',
      access_token: this.jwtService.sign(payload)
    });
  }
}
