import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Bucket } from './bucket.entity';
import { CreateBucketDto } from './dto/create-bucket.dto';
import { UpdateDataBucketDto } from './dto/updateData-bucket.dto';
import { UpdateBucketDto } from './dto/update-bucket.dto';
import * as Sentry from '@sentry/node';

@Injectable()
export class BucketService {
  constructor(
    @Inject('BUCKET_REPOSITORY')
    private bucketRepository: Repository<Bucket>,
  ) {}

  async create(createBucketDto: CreateBucketDto): Promise<Bucket> {
    const transaction = Sentry.startTransaction({
      op: "bucket.create",
      name: "Create new bucket",
    });

    const bucket = new Bucket();
    bucket.title = createBucketDto.title;
    bucket.description = createBucketDto.description;

    const r = this.bucketRepository.save(bucket);

    transaction.finish();

    return r;
  }

  async update(id: string, updateBucketDto: UpdateBucketDto): Promise<Bucket> {
    const transaction = Sentry.startTransaction({
      op: "bucket.update",
      name: "Update basic bucket data",
    });

    let bucket = await this.bucketRepository.findOneBy({ id: id });

    if (bucket == null) throw new NotFoundException("Bucket not found")

    if (updateBucketDto.title != null) bucket.title = updateBucketDto.title;
    if (updateBucketDto.description != null) bucket.description = updateBucketDto.description;

    const r = this.bucketRepository.save(bucket);

    transaction.finish();

    return r;
  }

  async updateData(id: string, updateDataBucketDto: UpdateDataBucketDto): Promise<Bucket> {
    const transaction = Sentry.startTransaction({
      op: "bucket.updatedata",
      name: "Update data & model for bucket",
    });

    let bucket = await this.bucketRepository.findOneBy({ id: id });

    if (bucket == null) throw new NotFoundException("Bucket not found")

    if (updateDataBucketDto.model != null) bucket.model = updateDataBucketDto.model;
    if (updateDataBucketDto.data != null) bucket.data = updateDataBucketDto.data;

    const r = this.bucketRepository.save(bucket);

    transaction.finish();

    return r;
  }

  async findOne(id: string): Promise<Bucket> {
    const transaction = Sentry.startTransaction({
      op: "bucket.findone",
      name: "Get one bucket",
    });

    const r = this.bucketRepository.findOneBy({ id: id });

    transaction.finish();

    return r;
  }

  async findAll(): Promise<Bucket[]> {
    const transaction = Sentry.startTransaction({
      op: "bucket.findall",
      name: "Get list of buckets",
    });

    const r = this.bucketRepository.find();

    transaction.finish();

    return r;
  }
}