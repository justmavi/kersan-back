import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Image } from './product_image.entity';

@Entity()
@Index(['name', 'description'])
export class Product {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: false })
  @Index({ unique: true })
  public name: string;

  @Column('varchar', { array: true, nullable: true })
  public tags: string[];

  @OneToMany(() => Image, (image) => image.product)
  public photos: Array<Image>;

  @Column({ nullable: true })
  @Index()
  public description: string;

  @Column('decimal', { nullable: true })
  public newPrice: number;

  @Column('decimal', { nullable: true })
  public oldPrice: number;

  @Column({ default: true })
  public displayOldPrice: boolean;

  @Column({ default: true })
  public contains: boolean;

  @Column('jsonb', { nullable: true })
  public properties: Record<string, unknown>;

  @CreateDateColumn()
  @Index()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  constructor(dto?: CreateProductDto | UpdateProductDto) {
    if (dto) {
      this.name = dto.name;
      this.description = dto.description;
      this.tags = dto.tags;
      this.newPrice = dto.newPrice;
      this.oldPrice = dto.oldPrice;
      this.displayOldPrice = dto.displayOldPrice;
      this.contains = dto.contains;
      this.properties = dto.properties;
    }
  }
}
