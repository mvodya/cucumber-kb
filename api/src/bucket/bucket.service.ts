import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Bucket } from './bucket.entity';
import { CreateBucketDto } from './dto/create-bucket.dto';

@Injectable()
export class BucketService {
  constructor(
    @Inject('BUCKET_REPOSITORY')
    private bucketRepository: Repository<Bucket>,
  ) {}

  create(createBucketDto: CreateBucketDto): Promise<Bucket> {
    const bucket = new Bucket();
    bucket.title = createBucketDto.title;
    bucket.description = createBucketDto.description;

    return this.bucketRepository.save(bucket);
  }

  async findOne(id: string): Promise<Bucket> {
    return this.bucketRepository.findOneBy({ id: id });
  }

  async findAll(): Promise<Bucket[]> {
    return this.bucketRepository.find();
  }
}