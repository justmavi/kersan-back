import { Allow, IsOptional, Length } from 'class-validator';

export class CreateProductDto {
  @Length(3, 20)
  public name: string;

  @Length(0, 2000)
  @IsOptional()
  public description: string;

  @Allow()
  public images: any[];
}
