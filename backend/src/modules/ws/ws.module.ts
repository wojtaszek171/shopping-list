import { Module } from '@nestjs/common';
import { WsGateway } from './ws.gateway';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [WsGateway],
  exports: [WsGateway],
  imports: [JwtModule]
})
export class WsModule {}
