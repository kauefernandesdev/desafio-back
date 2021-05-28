import { Sequelize } from 'sequelize-typescript';

import { sequelizeOptions } from '../config';

import { Produtor, ContaBancaria } from '../database/models';

export const sequelizeProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(sequelizeOptions);

      sequelize.addModels([Produtor, ContaBancaria]);

      await sequelize.sync();

      return sequelize;
    },
  },
];
