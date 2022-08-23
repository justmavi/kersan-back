import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class PathParamSlug {
  @IsString()
  @IsNotEmpty()
  public slug: string;
}

export class PathParamId {
  @IsInt()
  public id: number;
}
