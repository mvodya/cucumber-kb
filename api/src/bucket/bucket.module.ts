import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { BucketController } from './bucket.controller';
import { bucketProviders } from './bucket.providers';
import { BucketService } from './bucket.service';

@Module({
  imports: [DatabaseModule],
  controllers: [BucketController],
  providers: [
    ...bucketProviders,
    BucketService,
  ],
})
export class BucketModule {}
