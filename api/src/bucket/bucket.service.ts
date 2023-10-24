import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Bucket } from './bucket.entity';
import { CreateBucketDto } from './dto/create-bucket.dto';
import { UpdateDataBucketDto } from './dto/updateData-bucket.dto';
import { UpdateBucketDto } from './dto/update-bucket.dto';

@Injectable()
export class BucketService {
  constructor(
    @Inject('BUCKET_REPOSITORY')
    private bucketRepository: Repository<Bucket>,
  ) {}

  async create(createBucketDto: CreateBucketDto): Promise<Bucket> {
    const bucket = new Bucket();
    bucket.title = createBucketDto.title;
    bucket.description = createBucketDto.description;

    return this.bucketRepository.save(bucket);
  }

  async update(id: string, updateBucketDto: UpdateBucketDto): Promise<Bucket> {
    let bucket = await this.bucketRepository.findOneBy({ id: id });

    if (bucket == null) throw new NotFoundException("Bucket not found")

    if (updateBucketDto.title != null) bucket.title = updateBucketDto.title;
    if (updateBucketDto.description != null) bucket.description = updateBucketDto.description;

    return this.bucketRepository.save(bucket);
  }

  async updateData(id: string, updateDataBucketDto: UpdateDataBucketDto): Promise<Bucket> {
    let bucket = await this.bucketRepository.findOneBy({ id: id });

    if (bucket == null) throw new NotFoundException("Bucket not found")

    if (updateDataBucketDto.model != null) bucket.model = updateDataBucketDto.model;
    if (updateDataBucketDto.data != null) bucket.data = updateDataBucketDto.data;

    return this.bucketRepository.save(bucket);
  }

  async findOne(id: string): Promise<Bucket> {
    return this.bucketRepository.findOneBy({ id: id });
  }

  async findAll(): Promise<Bucket[]> {
    return this.bucketRepository.find();
  }
}