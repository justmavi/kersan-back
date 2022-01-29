import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreateImageDto } from '../dto/create-image.dto';

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

  @Column()
  public productId: number;

  @ManyToOne(() => Product, (product) => product.photos, {
    onDelete: 'CASCADE',
  })
  public product: Product;

  @CreateDateColumn()
  public createdAt: Date;

  constructor(image?: Express.Multer.File & CreateImageDto) {
    if (image) {
      this.name = image.filename;
      this.realName = image.originalname;
      this.path = image.path;
      this.productId = image.productId;
    }
  }
}
