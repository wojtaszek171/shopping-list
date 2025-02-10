import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { User, UserSchema } from './model/user.schema';
import { secret } from './utils/constants';
import { join } from 'path/posix';
import { JwtModule } from '@nestjs/jwt';
import { configDotenv } from 'dotenv';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/jwtauth.guard';
import { ListController } from './controller/list.controller';
import { ListService } from './service/list.service';
import { List, ListSchema } from './model/list.schema';
import { Product, ProductSchema } from './model/product.schema';

configDotenv();

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: List.name, schema: ListSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_NAME}?authSource=admin`
    ),
    JwtModule.register({
      secret,
      signOptions: { expiresIn: '2h' }
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    })
  ],
  controllers: [AppController, UserController, ListController],
  providers: [
    AppService,
    UserService,
    ListService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AppModule {
  configure() {
    // .exclude(
    //   { path: 'api/v1/video/:id', method: RequestMethod.GET }
    // )
    // .forRoutes(VideoController);
  }
}
