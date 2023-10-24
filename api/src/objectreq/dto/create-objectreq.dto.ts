import { IsJSON, IsUUID } from 'class-validator';

export class CreateObjectReqDto {
  @IsUUID()
  bucketId: string

  @IsJSON()
  data: string;
}