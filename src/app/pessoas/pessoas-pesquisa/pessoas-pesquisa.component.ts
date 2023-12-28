import { Component, OnInit, ViewChild } from '@angular/core';
import { PessoaFiltro, PessoaService } from '../pessoas.service';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {
  totalRegistros = 0;
  filtro = new PessoaFiltro();
  lancamentoPessoas: any = [];

  @ViewChild('tabela') grid: any; // para resetar a tabela após exclusão de algum item

  constructor(
    private pessoaService: PessoaService,
    private error: ErrorHandlerService,
    private msgService: MessageService,
    private confirmation: ConfirmationService
  ) { }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.lancamentoPessoas = resultado;
      })
      .catch(erro => this.error.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent): void {
    let pagina = 0;

    if (event.first && event.rows) {
      pagina = Math.floor((event.first ?? 0) / (event.rows ?? 1))
    }

    this.pesquisar(pagina);

  }

  excluir(pessoa: any) {

    this.pessoaService.excluir(pessoa.codigo)
    .then(() => {
      this.grid.reset();
    })
    .catch(erro => this.error.handle(erro));

    this.showDelete();
  }

  confirmarExclusao(pessoa: any){
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () =>{
        this.excluir(pessoa);
      }
      });
    }

    showDelete(){
      this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Item excluído com sucesso!'})
    }
}
