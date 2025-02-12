import {
  Injectable,
  ExecutionContext,
  UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const skipGuard = this.reflector.get<boolean>(
      'skipAuthGuard',
      context.getHandler()
    );
    if (skipGuard) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    if (err || !user) {
      throw new UnauthorizedException('Unauthorized access');
    }
    return user;
  }
}
