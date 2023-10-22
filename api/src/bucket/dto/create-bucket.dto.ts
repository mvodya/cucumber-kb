import { IsNotEmpty } from 'class-validator';

export class CreateBucketDto {
  @IsNotEmpty()
  title: string;

  description: string;
}