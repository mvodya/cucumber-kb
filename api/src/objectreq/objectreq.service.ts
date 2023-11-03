import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ObjectReq } from './objectreq.entity';
import { Bucket } from 'src/bucket/bucket.entity';
import { CreateObjectReqDto } from './dto/create-objectreq.dto';
import { HttpService } from '@nestjs/axios';
import * as Sentry from '@sentry/node';

@Injectable()
export class ObjectReqService {
  constructor(
    private readonly httpService: HttpService,
    @Inject('OBJECTREQ_REPOSITORY')
    private objectReqRepository: Repository<ObjectReq>,
    @Inject('BUCKET_REPOSITORY')
    private bucketRepository: Repository<Bucket>,
  ) { }

  async create(id: string, createObjectReqDto: CreateObjectReqDto): Promise<ObjectReq> {
    const transaction = Sentry.startTransaction({
      op: "objreq.create",
      name: "Create new object request",
    });

    const bucket = await this.bucketRepository.findOneBy({ id: id });
    if (bucket == null) throw new NotFoundException("Bucket not found")

    const objectreq = new ObjectReq();
    objectreq.bucket = bucket;
    objectreq.data = createObjectReqDto.data;

    let requestObject = {}
    requestObject["model"] = bucket.model
    requestObject["data"] = bucket.data
    requestObject["object"] = objectreq.data

    const response = await this.httpService.request(
      {
        method: "post",
        url: "http://kbsolver:8000/solve",
        headers: {'Content-Type': 'application/json; charset=utf-8'},
        data: requestObject
      }
    ).toPromise().then(function (response) {
      objectreq.response = response.data;
      objectreq.is_done = true;
      objectreq.is_planned = false;
    }).catch(function (error) {
      throw new BadRequestException("KbSolver Error")
    });

    const r = this.objectReqRepository.save(objectreq);

    transaction.finish();

    return await r;
  }

  async findOne(id: string): Promise<ObjectReq> {
    const transaction = Sentry.startTransaction({
      op: "objreq.findone",
      name: "Get object request",
    });

    const r = this.objectReqRepository.findOneBy({ id: id });

    transaction.finish();

    return r;
  }

  async findAllByBucket(id: string): Promise<ObjectReq[]> {
    const transaction = Sentry.startTransaction({
      op: "objreq.findall",
      name: "Get list of object requests for bucket",
    });

    const bucket = await this.bucketRepository.findOne({ where: { id: id }, relations: ["objectreqs"] });
    if (bucket == null) throw new NotFoundException("Bucket not found")

    const r = bucket.objectreqs;

    transaction.finish();

    return r;
  }

  async removeAllByBucket(id: string) {
    const transaction = Sentry.startTransaction({
      op: "objreq.removeall",
      name: "Clear all object requests for bucket",
    });

    const bucket = await this.bucketRepository.findOne({ where: { id: id }, relations: ["objectreqs"] });
    if (bucket == null) throw new NotFoundException("Bucket not found")

    this.objectReqRepository.delete({ bucket: bucket })

    transaction.finish();

    return [];
  }
}