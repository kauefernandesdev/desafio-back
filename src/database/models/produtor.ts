import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';

import { ContaBancaria } from './conta-bancaria';

@Table({
  tableName: 'produtores',
})
export class Produtor extends Model<Produtor> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  cpf: string;

  @ForeignKey(() => ContaBancaria)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  contaBancariaId: number;

  @BelongsTo(() => ContaBancaria, {
    foreignKey: 'contaBancariaId',
  })
  contaBancaria: ContaBancaria;
}
