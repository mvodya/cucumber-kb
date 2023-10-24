import { Controller, Post, Get, Query, ParseUUIDPipe, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { ObjectReqService } from './objectreq.service';
import { CreateObjectReqDto } from './dto/create-objectreq.dto';
import { ObjectReq } from './objectreq.entity';

@Controller('objectreq')
export class ObjectReqController {
  constructor(private readonly objectreqService: ObjectReqService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('create')
  create(@Query() createObjectReqDto: CreateObjectReqDto): Promise<ObjectReq> {
    return this.objectreqService.create(createObjectReqDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  get(@Query('id', ParseUUIDPipe) id: string) {
    return this.objectreqService.findOne(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('list')
  getByBucket(@Query('bucketId', ParseUUIDPipe) id: string) {
    return this.objectreqService.findAllByBucket(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('clear')
  clearAllByBucket(@Query('bucketId', ParseUUIDPipe) id: string) {
    return this.objectreqService.removeAllByBucket(id);
  }
}