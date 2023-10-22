import { Controller, Post, Get, Query, ParseUUIDPipe } from '@nestjs/common';
import { BucketService } from './bucket.service';
import { CreateBucketDto } from './dto/create-bucket.dto';
import { Bucket } from './bucket.entity';

@Controller('bucket')
export class BucketController {
  constructor(private readonly bucketService: BucketService) {}

  @Post('create')
  create(@Query() createBucketDto: CreateBucketDto): Promise<Bucket> {
    return this.bucketService.create(createBucketDto);
  }

  @Get()
  get(@Query('id', ParseUUIDPipe) id: string) {
    return this.bucketService.findOne(id);
  }

  @Get('list')
  list() {
    return this.bucketService.findAll();
  }
}
