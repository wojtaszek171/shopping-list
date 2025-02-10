import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  Get,
  Req
} from '@nestjs/common';
import { User } from '../model/user.schema';
import { UserService } from '../service/user.service';
import { JwtService } from '@nestjs/jwt';
import { SkipAuthGuard } from 'src/guards/skipauth.guard';
import { Request } from 'express';
import { UserDto } from 'src/dto/User.dto';

@Controller('/api/v1/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) {}

  @SkipAuthGuard()
  @Post('/signup')
  async Signup(@Res() response, @Body() user: User) {
    try {
      const newUser = await this.userService.signup(user);
      const token = await this.userService.signin(user, this.jwtService);

      response.cookie('access_token', token, {
        path: '/', // Cookie is accessible from all paths
        expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
        secure: true, // Cookie will only be sent over HTTPS in production
        httpOnly: true, // Cookie cannot be accessed via client-side scripts
        sameSite: 'None'
      });

      return response.status(HttpStatus.CREATED).json({
        newUser
      });
    } catch (error) {
      const DUPLICATED_USER_CODE = 11000;

      const message =
        error.code === DUPLICATED_USER_CODE
          ? `${Object.keys(error?.keyPattern)?.[0]} already exists`
          : error.message;

      return response.status(HttpStatus.BAD_REQUEST).json({
        message
      });
    }
  }

  @SkipAuthGuard()
  @Post('/signin')
  async SignIn(@Res() response, @Body() user: User) {
    try {
      const token = await this.userService.signin(user, this.jwtService);
      return response
        .cookie('access_token', token, {
          path: '/', // Cookie is accessible from all paths
          expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
          secure: true, // Cookie will only be sent over HTTPS in production
          httpOnly: true, // Cookie cannot be accessed via client-side scripts
          sameSite: 'None'
        })
        .status(HttpStatus.OK)
        .json(token);
    } catch (error) {
      return response.status(error.status).json({
        message: error.message
      });
    }
  }

  @Post('/signout')
  SignOut(@Res() response) {
    return response.clearCookie('access_token', {});
  }

  @Get('/session')
  async checkSession(@Req() request: Request, @Res() response) {
    try {
      const token = request.cookies?.['access_token']?.token;
      const decoded = this.jwtService.decode(token) as { [key: string]: any };

      const user = await this.userService.getOne(decoded.username);
      const userDto = new UserDto(user.toObject());

      return response.status(HttpStatus.OK).json(userDto);
    } catch (error) {
      return response.status(error.status).json({
        message: error.message
      });
    }
  }
}
