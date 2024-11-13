import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  Default,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './User';
import { Label } from './Label';

@Table({
  timestamps: true,
  tableName: 'note',
})
export class Note extends Model {
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

  @ForeignKey(() => Label)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  labelId!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  content!: string;

  @Default('#ffffff')
  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  tileColor!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  isArchived!: boolean;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Label)
  label!: Label;
}
