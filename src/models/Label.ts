import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  Default,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { User } from './User';
import { Note } from './Note';

@Table({
  timestamps: true,
  tableName: 'label',
})
export class Label extends Model {
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

  @Default('Uncategorized')
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  title!: string;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => Note)
  note!: Note[];
}
