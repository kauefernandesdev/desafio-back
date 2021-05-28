import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  HttpException,
  Delete,
  Param,
} from '@nestjs/common';

import { Produtor } from 'src/database/models';

import { HttpValidationPipe } from 'src/validator';

import { CreateProdutor } from '../dtos';
import { ProdutorService } from '../services';

@Controller('produtor')
export class ProdutorController {
  constructor(private produtorService: ProdutorService) {}

  @Get()
  async get() {
    return await this.produtorService.findAll();
  }

  @Post()
  async post(@Body(new HttpValidationPipe()) data: CreateProdutor) {
    return await this.produtorService.create(data);
  }

  @Patch(':id')
  async patch(@Param('id') id: number, @Body() produtor: Produtor) {
    let existeProdutor = await this.produtorService.findOneById(id);

    if (!existeProdutor) {
      throw new HttpException('Produtor não encontrado', 404);
    }

    existeProdutor = Object.assign(existeProdutor, produtor);

    return await this.produtorService.update(existeProdutor);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.produtorService.delete(id);
    return {
      message: 'Produtor deletado com sucesso.',
    };
  }
}
