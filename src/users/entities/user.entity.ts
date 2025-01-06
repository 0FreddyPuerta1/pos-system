import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { IUser } from 'src/interfaces/user.interface';

@Table({
  tableName: 'USERS',
  timestamps: true,
})
export class User extends Model implements IUser {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM('admin', 'user'),
    allowNull: false,
  })
  role: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isActive: boolean;
}
