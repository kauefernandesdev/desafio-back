import { IsDefined, IsInt } from 'class-validator';
export class NovaTransacao {
  @IsDefined({
    message: 'O campo saldo é obrigatório.',
  })
  @IsInt({
    message: 'O campo saldo precisa ser um inteiro',
  })
  saldo: number;
}
