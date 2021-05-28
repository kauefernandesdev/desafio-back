import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'conta_bancaria',
})
export class ContaBancaria extends Model<ContaBancaria> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  saldo: number;
}
