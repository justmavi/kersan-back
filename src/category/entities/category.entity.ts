import slugify from 'slugify';
import { Subcategory } from 'src/subcategory/entities/subcategory.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public name: string;

  @Column({ unique: true })
  public slug: string;

  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
  public subcategories: Array<Subcategory>;

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
