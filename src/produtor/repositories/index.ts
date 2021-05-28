import { Produtor } from '../../database/models';

export const PRODUTOR_REPOSITORY = 'PRODUTOR_REPOSITORY';

export const produtorRepositories = [
  {
    provide: PRODUTOR_REPOSITORY,
    useValue: Produtor,
  },
];

export type ProdutorRepository = typeof Produtor;
