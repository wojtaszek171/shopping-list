import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_NAME}?authSource=admin`
    )
  ]
})
export class DatabaseModule {}
