import { Module } from '@nestjs/common';

import { DatabaseModule } from './database';
import { ProdutorModule } from './produtor';

@Module({
  imports: [DatabaseModule, ProdutorModule],
})
export class AppModule {}
