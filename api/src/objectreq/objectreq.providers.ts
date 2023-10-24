import { DataSource } from 'typeorm';
import { ObjectReq } from './objectreq.entity';

export const objectReqProviders = [
  {
    provide: 'OBJECTREQ_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ObjectReq),
    inject: ['DATA_SOURCE'],
  },
];