import { IsDefined, IsString } from 'class-validator';

export class CreateProdutor {
  @IsDefined({
    message: 'O atributo name é obrigatório.',
  })
  @IsString({
    message: 'O atributo name precisa ser uma string.',
  })
  name: string;

  @IsDefined({
    message: 'O atributo email é obrigatório.',
  })
  @IsString({
    message: 'O atributo email precisa ser uma string.',
  })
  email: string;

  @IsDefined({
    message: 'O atributo cpf é obrigatório.',
  })
  @IsString({
    message: 'O atributo cpf precisa ser uma string.',
  })
  cpf: string;
}
