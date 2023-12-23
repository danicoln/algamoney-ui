import { Component, OnInit } from '@angular/core';
import { LancamentoFiltro, LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit{

  /**O Typescript exige que as variáveis sejam declaradas e inicializadas.
   *  Entretanto, para datas não é possível inicializar com valor null,
   * pois o tipo Date não permite isso.
   * Sendo assim, é necessário declarar a variável como opcionais
   */
  dataVencimentoInicio?: Date;
  dataVencimentoFim?: Date;

  descricao: string = '';
  lancamentos: any = [];

  constructor(private lancamentoService: LancamentoService){}


  ngOnInit(){
      this.pesquisar();
  }

  pesquisar() {
    const filtro : LancamentoFiltro = {
      descricao: this.descricao,
      dataVencimentoInicio: this.dataVencimentoInicio,
      dataVencimentoFim: this.dataVencimentoFim
    };

    this.lancamentoService.pesquisar(filtro)
    .then( lancamentos => {
      this.lancamentos = lancamentos;
    });
  }
}
