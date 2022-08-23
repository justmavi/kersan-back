import { ArrayNotEmpty, ArrayUnique, IsInt } from 'class-validator';

export class DeleteImagesDto {
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsInt({ each: true })
  public images: Array<number>;
}
