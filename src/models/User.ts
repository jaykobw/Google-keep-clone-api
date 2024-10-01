import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  Unique,
  Default,
  IsEmail,
  BeforeCreate,
  BeforeUpdate,
  HasMany,
} from 'sequelize-typescript';
import bcrypt from 'bcryptjs';
import { Session } from './Session';
import { Note } from './Note';

@Table({
  timestamps: true,
  tableName: 'users',
  paranoid: true,
})
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Unique
  @IsEmail
  @Column({
    type: DataType.STRING(200),
    allowNull: false,
  })
  email!: string;

  @Unique
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  passwordSalt!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  password!: string;

  @Default('default.jpg')
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  avatar!: string;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isEnabled!: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  passwordLastUpdatedAt!: Date;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isDeleted!: Boolean;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  toBeDeletedAt!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  deletedAt?: Date;

  @HasMany(() => Session)
  session!: Session[];

  @HasMany(() => Note)
  note!: Note[];

  @BeforeCreate
  static encryptPasswordBeforeCreate(user: User): void {
    const genSalt = bcrypt.genSaltSync(13);

    user.passwordSalt = `${genSalt}`;
    user.password = bcrypt.hashSync(user.password, genSalt);
  }

  @BeforeUpdate
  static encryptPasswordBeforeUpdate(user: User): void {
    const genSalt = bcrypt.genSaltSync(13);

    user.passwordSalt = `${genSalt}`;
    user.password = bcrypt.hashSync(user.password, genSalt);
  }
}
