import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

/**Criamos uma interface para definir um contrato
 * Desta forma, evitamos de cometer algum erro no momento
 * de usar o método pesquisar do service
 */
export class LancamentoFiltro {
  descricao?: string;
  dataVencimentoInicio?: Date;
  dataVencimentoFim?: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class LancamentoService {

  filtro = new LancamentoFiltro();
  datePipe?: DatePipe;
  lancamentosUrl = 'http://localhost:8080/lancamentos'

  constructor( private http: HttpClient, datePipe?: DatePipe) {
    this.datePipe = datePipe; // Foi necessário colocar o datePipe no construtor para que a implementação de data nos filtros funcionasse.
    //cria um filtro padrão
    this.pesquisar(this.filtro);
  }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLWFwaSIsInN1YiI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJleHAiOjE3MDMzNzAzOTB9.TIDUbczAj7DlOGlzYUE9jcIou_xHcfSpXUkicM57_6s');
    let parametros = new HttpParams();

    parametros.set('page', filtro.pagina);
    parametros.set('size', filtro.itensPorPagina);

    if(filtro.descricao){
      parametros = parametros.set('descricao', filtro.descricao);
    }
    if(filtro.dataVencimentoInicio){
      parametros = parametros.set(
        'dataVencimentoDe',
        this.datePipe?.transform(filtro.dataVencimentoInicio.toUTCString(), 'yyyy-MM-dd')!);

    }
    if(filtro.dataVencimentoFim){
      parametros = parametros.set(
        'dataVencimentoAte',
        this.datePipe?.transform(filtro.dataVencimentoFim.toUTCString(), 'yyyy-MM-dd')!);
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`,
    { headers, params: parametros})
      .toPromise()

      .then((response : any ) => {
     const respJson = response;
     const lancamentos = respJson.content;

     const resultado = {
      lancamentos,
      total: response.content.totalElements
    };
    return resultado;

      /** aula do thiago
       .then((response : any) => {
         if (response) {
           return response;
         } else {
           throw new Error('A resposta está vazia.');
          }
          *
         *
         *
         */
      });

  }
}
