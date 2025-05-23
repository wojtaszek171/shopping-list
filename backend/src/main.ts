import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://localhost:5173', // replace with your frontend domain
    credentials: true,
    sameSite: 'none'
  });
  app.setGlobalPrefix('api/v1');
  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
