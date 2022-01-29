import { ArrayNotEmpty, IsArray, IsInt } from 'class-validator';

export class DeleteImagesFilters {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  public images: Array<number>;
}
