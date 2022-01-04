import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Product } from './product.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public path: string;

  @Column()
  public name: string;

  @Column()
  public realName: string;

  @ManyToOne(() => Product, (product) => product.photos)
  public product: Product;

  @CreateDateColumn()
  public createdAt: Date;
}
