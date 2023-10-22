import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BucketModule } from './bucket/bucket.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BucketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
