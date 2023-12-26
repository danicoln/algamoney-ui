import { Component, OnInit } from '@angular/core';
import { LancamentoService } from '../lancamento.service';
import { LancamentoFiltro } from '../model/lancamentos-filtro';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos: any = [];

  constructor(private lancamentoService: LancamentoService) { }


  ngOnInit() {
    //this.pesquisar(); //Quando o componente Lazy é iniciado, o onLazyLoad é chamado automaticamente, não sendo necessário entao chamar o pesquisar() no ngOnInit()
  }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.lancamentos = resultado;
      });
  }

  aoMudarPagina(evento: LazyLoadEvent): void {
    let pagina = 0;

    if (evento.first && evento.rows) {
      //pagina = evento.first / evento.rows;
      pagina = Math.floor((evento.first ?? 0) / (evento.rows ?? 1))
    }
    this.pesquisar(pagina);

    console.log('Evento:', evento);
    console.log('Número da Página', pagina)
  }
}
