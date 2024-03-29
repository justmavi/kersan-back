import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(3, 40)
  public name: string;

  @IsString()
  @MinLength(3)
  public slug: string;

  @Length(0, 2000)
  @IsOptional()
  public description: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  public tags: string[];

  @IsNumber()
  public newPrice: number;

  @IsOptional()
  @IsNumber()
  @ValidateIf((obj, val) => val !== null)
  public oldPrice: number | null;

  @IsOptional()
  @IsBoolean()
  public contains = true;

  @IsInt()
  public categoryId: number;

  @IsInt()
  public subcategoryId: number;

  @IsObject()
  public properties: Record<string, unknown>;
}
