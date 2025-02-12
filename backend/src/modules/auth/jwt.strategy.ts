import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const extractor = (request) => {
      let token = null;
      if (request && request.cookies) {
        token = request.cookies['jwt'];
      }
      return token;
    };
    super({
      jwtFromRequest: extractor,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'defaultSecret'
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
