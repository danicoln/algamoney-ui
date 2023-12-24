import { Component, OnInit } from '@angular/core';
import { LancamentoService } from '../lancamento.service';
import { LancamentoFiltro } from './model/lancamentos-filtro';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit{

  filtro = new LancamentoFiltro();
  lancamentos: any = [];

  constructor(private lancamentoService: LancamentoService){}


  ngOnInit(){
      this.pesquisar();
  }

  pesquisar() {
    this.lancamentoService.pesquisar(this.filtro)
    .then( resultado => {
      this.lancamentos = resultado;
    });
  }
}
