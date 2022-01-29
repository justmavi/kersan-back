import { IsInt } from 'class-validator';

export class CreateImageDto {
  @IsInt()
  public productId: number;
}
