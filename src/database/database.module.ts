import { Global, Module } from '@nestjs/common';

import { sequelizeProviders } from './sequelize.provider';

@Global()
@Module({
  imports: [],
  providers: [...sequelizeProviders],
  exports: [...sequelizeProviders],
})
export class DatabaseModule {}
