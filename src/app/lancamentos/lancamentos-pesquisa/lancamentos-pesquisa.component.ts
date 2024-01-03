import { Component, OnInit, ViewChild } from '@angular/core';
import { LancamentoService } from '../lancamento.service';
import { LancamentoFiltro } from './model/lancamentos-filtro';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos: any = [];

  @ViewChild('tabela') grid: any;

  constructor(
    private lancamentoService: LancamentoService,
    private error: ErrorHandlerService,
    private msgService: MessageService,
    private confirmation: ConfirmationService
  ) { }


  ngOnInit() {
    //this.pesquisar(); //Quando o componente Lazy é iniciado, o onLazyLoad é chamado automaticamente, não sendo necessário entao chamar o pesquisar() no ngOnInit()
  }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.lancamentos = resultado;
      })
      .catch(erro => this.error.handle(erro));
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

  confirmarExclusao(lancamento: any){
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () =>{
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any) {

    this.showDelete(); // o serviço de toasty, precisa vir antes de excluir o item
    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
        this.grid.reset(); // este método reinicia a tabela, sendo assim, atualiza a paginação.
      })
      .catch(erro => this.error.handle(erro));
  }


  showDelete() {
    this.msgService.add({ severity: 'error', summary: 'Excluído', detail: 'Item Excluído!' });
  }

}
