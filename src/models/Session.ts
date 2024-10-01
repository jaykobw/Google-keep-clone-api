import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  Unique,
  Default,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './User';

@Table({
  timestamps: true,
  tableName: 'sessions',
})
export class Session extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId!: string;

  @Default('api')
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  token!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  sessionIP!: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
  })
  sessionUserAgent!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  sessionOS!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  expiresAt!: Date;

  @BelongsTo(() => User)
  user!: User;
}
