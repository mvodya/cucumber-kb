import { Controller, Post, Get, Query, ParseUUIDPipe } from '@nestjs/common';
import { BucketService } from './bucket.service';
import { CreateBucketDto } from './dto/create-bucket.dto';
import { Bucket } from './bucket.entity';
import { UpdateDataBucketDto } from './dto/updateData-bucket.dto';
import { UpdateBucketDto } from './dto/update-bucket.dto';

@Controller('bucket')
export class BucketController {
  constructor(private readonly bucketService: BucketService) {}

  @Post('create')
  create(@Query() createBucketDto: CreateBucketDto): Promise<Bucket> {
    return this.bucketService.create(createBucketDto);
  }

  @Post('update')
  update(@Query('id', ParseUUIDPipe) id: string, @Query() updateBucketDto: UpdateBucketDto): Promise<Bucket> {
    return this.bucketService.update(id, updateBucketDto);
  }

  @Post('updateData')
  updateData(@Query('id', ParseUUIDPipe) id: string, @Query() updateDataBucketDto: UpdateDataBucketDto): Promise<Bucket> {
    return this.bucketService.updateData(id, updateDataBucketDto);
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
