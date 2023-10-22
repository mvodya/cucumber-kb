import { IsJSON } from 'class-validator';

export class UpdateDataBucketDto {
  @IsJSON()
  model: string;

  @IsJSON()
  data: string;
}