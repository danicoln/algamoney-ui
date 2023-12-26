import { Component, OnInit } from '@angular/core';
import { PessoaFiltro, PessoaService } from '../pessoas.service';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {
  totalRegistros = 0;
  filtro = new PessoaFiltro();
  lancamentoPessoas: any = [];

  constructor(private pessoaService: PessoaService){}

  ngOnInit() {

  }

  pesquisar(pagina = 0){
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.lancamentoPessoas = resultado;
    })
  }

  aoMudarPagina(event: LazyLoadEvent): void{
    let pagina = 0;

    if(event.first && event.rows){
      pagina = Math.floor((event.first ?? 0) / (event.rows ?? 1))
    }

    this.pesquisar(pagina);

    console.log('Evento:', event);
    console.log('Número da Página', pagina)
  }

}
