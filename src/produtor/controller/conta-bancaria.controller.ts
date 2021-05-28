import { Body, Controller, HttpException, Param, Post } from '@nestjs/common';
import { HttpValidationPipe } from 'src/validator';

import { ProdutorService } from '../services';
import { NovaTransacao } from '../dtos';

@Controller('produtor/:id/conta')
export class ContaBancariaController {
  constructor(private produtorService: ProdutorService) {}

  @Post()
  async post(
    @Param('id') id: number,
    @Body(new HttpValidationPipe()) transacao: NovaTransacao,
  ) {
    let produtor = await this.produtorService.findOneById(id);

    if (!produtor) {
      throw new HttpException('Produtor não encontrado', 404);
    }

    produtor = await this.produtorService.adicionarSaldo(produtor, transacao);

    return produtor;
  }
}
