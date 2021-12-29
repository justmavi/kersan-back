import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: false })
  @Index({ unique: true })
  public name: string;

  @Column('varchar', { array: true, nullable: true })
  public tags: string[];

  @Column('varchar', { array: true, nullable: true })
  public photos: string[];

  @Column({ nullable: true })
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
}
