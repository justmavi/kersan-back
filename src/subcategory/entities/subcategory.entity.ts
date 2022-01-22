import slugify from 'slugify';
import { Category } from 'src/category/entities/category.entity';
import { Product } from 'src/product/entities/product.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Subcategory {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public name: string;

  @Column({ unique: true })
  public slug: string;

  @Column()
  public categoryId: number;

  @ManyToOne(() => Category, (category) => category.subcategories)
  public category: Category;

  @OneToMany(() => Product, (product) => product.subcategory)
  public products: Array<Product>;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  public slugify() {
    if (this.slug) {
      this.slug = slugify(this.slug, { lower: true });
    }
  }
}
