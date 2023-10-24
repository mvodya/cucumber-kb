import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ObjectReqController } from './objectreq.controller';
import { objectReqProviders } from './objectreq.providers';
import { ObjectReqService } from './objectreq.service';
import { bucketProviders } from 'src/bucket/bucket.providers';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    DatabaseModule,
    HttpModule
  ],
  controllers: [ObjectReqController],
  providers: [
    ...objectReqProviders,
    ...bucketProviders,
    ObjectReqService,
  ],
})
export class ObjectReqModule {}
