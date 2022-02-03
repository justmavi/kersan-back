import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PasswordResetHash {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public hash: string;

  @Column()
  public userId: number;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  public user: User;

  @Column('timestamp')
  public expiresIn: Date;

  @CreateDateColumn()
  public createdAt: Date;
}
