import slugify from 'slugify';
import { Category } from 'src/category/entities/category.entity';
import { Subcategory } from 'src/subcategory/entities/subcategory.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Image } from './product-image.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public name: string;

  @Column({ unique: true })
  public slug: string;

  @Column('varchar', { array: true, nullable: true })
  public tags: string[];

  @OneToMany(() => Image, (image) => image.product)
  public photos: Array<Image>;

  @Column()
  public categoryId: number;

  @ManyToOne(() => Category)
  public category: Category;

  @Column()
  public subcategoryId: number;

  @ManyToOne(() => Subcategory)
  public subcategory: Subcategory;

  @Column({ nullable: true })
  @Index()
  public description: string;

  @Column('decimal')
  public newPrice: number;

  @Column('decimal', { nullable: true })
  public oldPrice: number;

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
      this.slug = dto.slug;
      this.description = dto.description;
      this.tags = dto.tags;
      this.newPrice = dto.newPrice;
      this.oldPrice = dto.oldPrice;
      this.contains = dto.contains;
      this.properties = dto.properties;
      this.categoryId = dto.categoryId;
      this.subcategoryId = dto.subcategoryId;
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  public slugify() {
    if (this.slug) {
      this.slug = slugify(this.slug, { lower: true });
    }
  }
}
