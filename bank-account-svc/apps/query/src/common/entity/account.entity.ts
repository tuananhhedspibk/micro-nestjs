import { AccountType } from '@shared/enums/account-type.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryColumn('uuid')
  public id: string;

  @Column()
  public holder: string;

  @Column()
  public email: string;

  @Column({ type: 'enum', enum: AccountType })
  public type: AccountType;

  @Column({ name: 'is_active', default: true })
  public isActive: boolean;

  @CreateDateColumn({ name: 'created_date' })
  public createdDate: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  public updatedDate: Date;
}
