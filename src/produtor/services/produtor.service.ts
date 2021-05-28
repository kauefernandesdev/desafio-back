import { Injectable, Inject, HttpException } from '@nestjs/common';

import { ContaBancaria, Produtor } from '../../database/models';

import { CreateProdutor, NovaTransacao } from '../dtos';
import { PRODUTOR_REPOSITORY, ProdutorRepository } from '../repositories';

@Injectable()
export class ProdutorService {
  constructor(
    @Inject(PRODUTOR_REPOSITORY)
    private produtorRepository: ProdutorRepository,
  ) {}

  async findAll() {
    return await this.produtorRepository.findAll();
  }

  async findOneById(id: number) {
    return await this.produtorRepository.findOne({
      where: {
        id,
      },
      include: 'contaBancaria',
    });
  }

  async findOneByEmailOrCpf(email: string, cpf: string) {
    return await this.produtorRepository.findOne({
      where: {
        email,
        cpf,
      },
    });
  }

  async create(create: CreateProdutor): Promise<Produtor> {
    const { email, cpf, name } = create;

    const existeProdutor = await this.findOneByEmailOrCpf(email, cpf);

    if (existeProdutor) {
      throw new HttpException(
        'Já existe um produtor com esse email ou cpf',
        400,
      );
    }

    let produtor = new Produtor();

    produtor.email = email;
    produtor.cpf = cpf;
    produtor.name = name;

    let contaBancaria = new ContaBancaria();
    contaBancaria.saldo = 0;

    try {
      contaBancaria = await contaBancaria.save();
      produtor.contaBancariaId = contaBancaria.id;
      produtor = await produtor.save();
    } catch (err) {
      throw new HttpException('Internal server error', 500);
    }

    return produtor;
  }

  async update(produtor: Produtor) {
    try {
      produtor.contaBancaria = await produtor.contaBancaria.save();
      produtor = await produtor.save();
    } catch (err) {
      throw new HttpException('Internal server error', 500);
    }
    return produtor;
  }

  async delete(id: number) {
    const produtor = await this.findOneById(id);

    if (!produtor) {
      throw new HttpException('Produtor não encontrado', 404);
    }

    try {
      await this.produtorRepository.destroy({
        where: {
          id: produtor.id,
        },
      });
    } catch (err) {
      throw new HttpException('Internal server error', 500);
    }

    return true;
  }

  async adicionarSaldo(produtor: Produtor, novaTransacao: NovaTransacao) {
    const saldoAtual = produtor.contaBancaria.saldo;
    produtor.contaBancaria.saldo = saldoAtual + novaTransacao.saldo;
    return await this.update(produtor);
  }
}
