
export class Pessoa {
  codigo: number = 0;
  nome: string = '';
  ativo: boolean = false;
  endereco: Endereco = new Endereco();
}

export class Endereco {
  logradouro: string = '';
  numero: string = '';
  complemento: string = '';
  bairro: string = '';
  cep: string = '';
  cidade: string = '';
  estado: string = '';
}

export class Categoria {
  nome: string = '';
  codigo: number = 0;
}

export enum Tipo {
  RECEITA = 'RECEITA',
  DESPESA = 'DESPESA'
}

export class Lancamento {
  codigo: number = 0;
  tipo: string = 'RECEITA';
  dataVencimento?: Date;
  dataPagamento?: Date;
  descricao: string = '';
  valor: number = 0;
  observacao: string = '';
  pessoa = new Pessoa();
  categoria = new Categoria();
}
