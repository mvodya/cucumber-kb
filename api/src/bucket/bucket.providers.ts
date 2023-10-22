import { DataSource } from 'typeorm';
import { Bucket } from './bucket.entity';

export const bucketProviders = [
  {
    provide: 'BUCKET_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Bucket),
    inject: ['DATA_SOURCE'],
  },
];