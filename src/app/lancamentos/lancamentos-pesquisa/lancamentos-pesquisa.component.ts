import { Component, OnInit } from '@angular/core';
import { LancamentoService } from '../lancamento.service';
import { LancamentoFiltro } from './model/lancamentos-filtro';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit{

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos: any = [];

  constructor(private lancamentoService: LancamentoService){}


  ngOnInit(){
      //this.pesquisar(); //ao comentar aqui, não aparece os dados da tabela
  }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
    .then( resultado => {
      this.totalRegistros = resultado.total;
      this.lancamentos = resultado;
    });
  }

  aoMudarPagina(evento: LazyLoadEvent){
    console.log(evento);
    if (evento.first !== undefined && evento.rows !== undefined) {

      const pagina = evento.first / evento.rows;
      this.pesquisar(pagina);

      console.log(pagina)
  }

  }
}
