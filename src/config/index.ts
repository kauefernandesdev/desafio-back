import { SequelizeOptions } from 'sequelize-typescript';

export const getVariable = (name: string, defaultValue?: any) => {
  return process.env[name] ?? defaultValue;
};

export const sequelizeOptions: SequelizeOptions = {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'pagamento',
};
