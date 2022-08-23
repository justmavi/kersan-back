import * as bcrypt from 'bcrypt';
import { BaseEntity } from 'src/common/base/entity.base';
import { Roles } from 'src/common/enums/roles.enum';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column({ unique: true })
  public email: string;

  @Column({ select: false })
  public password: string;

  @Column('int')
  public role: Roles;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
