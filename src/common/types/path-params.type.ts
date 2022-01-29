import { IsInt } from 'class-validator';

export class PathParams {
  @IsInt()
  public id: number;
}
