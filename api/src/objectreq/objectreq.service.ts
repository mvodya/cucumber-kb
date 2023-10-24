import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ObjectReq } from './objectreq.entity';
import { Bucket } from 'src/bucket/bucket.entity';
import { CreateObjectReqDto } from './dto/create-objectreq.dto';

@Injectable()
export class ObjectReqService {
  constructor(
    @Inject('OBJECTREQ_REPOSITORY')
    private objectReqRepository: Repository<ObjectReq>,
    @Inject('BUCKET_REPOSITORY')
    private bucketRepository: Repository<Bucket>,
  ) {}

  async create(createObjectReqDto: CreateObjectReqDto): Promise<ObjectReq> {
    const bucket = await this.bucketRepository.findOneBy({ id: createObjectReqDto.bucketId });
    if (bucket == null) throw new NotFoundException("Bucket not found")

    const objectreq = new ObjectReq();
    objectreq.bucket = bucket;
    objectreq.data = JSON.parse(createObjectReqDto.data);

    return this.objectReqRepository.save(objectreq);
  }

  async findOne(id: string): Promise<ObjectReq> {
    return this.objectReqRepository.findOneBy({ id: id });
  }

  async findAllByBucket(id: string): Promise<ObjectReq[]> {
    const bucket = await this.bucketRepository.findOne({where: { id: id }, relations: ["objectreqs"]});
    if (bucket == null) throw new NotFoundException("Bucket not found")

    return bucket.objectreqs;
  }

  async removeAllByBucket(id: string) {
    const bucket = await this.bucketRepository.findOne({where: { id: id }, relations: ["objectreqs"]});
    if (bucket == null) throw new NotFoundException("Bucket not found")

    this.objectReqRepository.delete({ bucket: bucket })

    return [];
  }
}