import { IsNumber, IsString } from 'class-validator';

export class CreateSubcategoryDto {
  @IsString()
  public name: string;

  @IsString()
  public slug: string;

  @IsNumber()
  public categoryId: number;
}
