import { IsJSON, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateObjectReqDto {
  @IsNotEmpty()
  data: object;
}