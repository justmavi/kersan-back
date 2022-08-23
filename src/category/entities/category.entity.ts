import { BaseEntity } from 'src/common/base/entity.base';
import { Subcategory } from 'src/subcategory/entities/subcategory.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Category extends BaseEntity {
  @Column({ unique: true })
  public name: string;

  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
  public subcategories: Array<Subcategory>;
}
