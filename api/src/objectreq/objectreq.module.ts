import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ObjectReqController } from './objectreq.controller';
import { objectReqProviders } from './objectreq.providers';
import { ObjectReqService } from './objectreq.service';
import { bucketProviders } from 'src/bucket/bucket.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ObjectReqController],
  providers: [
    ...objectReqProviders,
    ...bucketProviders,
    ObjectReqService,
  ],
})
export class ObjectReqModule {}
