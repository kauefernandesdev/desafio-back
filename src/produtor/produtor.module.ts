import { Module } from '@nestjs/common';

import { ProdutorController, ContaBancariaController } from './controller';
import { produtorRepositories } from './repositories';
import { ProdutorService } from './services';

@Module({
  imports: [],
  controllers: [ProdutorController, ContaBancariaController],
  providers: [...produtorRepositories, ProdutorService],
  exports: [...produtorRepositories, ProdutorService],
})
export class ProdutorModule {}
