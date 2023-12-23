import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

/**Criamos uma interface para definir um contrato
 * Desta forma, evitamos de cometer algum erro no momento
 * de usar o método pesquisar do service
 */
export interface LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio?: Date;
  dataVencimentoFim?: Date;
}

@Injectable()
export class LancamentoService {

  datePipe?: DatePipe;
  lancamentosUrl = 'http://localhost:8080/lancamentos'

  constructor( private http: HttpClient, datePipe?: DatePipe) {
    this.datePipe = datePipe; // Foi necessário colocar o datePipe no construtor para que a implementação de data nos filtros funcionasse. 
    //cria um filtro padrão
    const filtro: LancamentoFiltro = {descricao: ''};
    this.pesquisar(filtro);
  }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLWFwaSIsInN1YiI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJleHAiOjE3MDMzNTUxMDN9.2DudsaxgBwc-6aORMAygOqXd87G8WvVQcWBHI_2mH7k');
    let parametros = new HttpParams();

    if(filtro.descricao){
      parametros = parametros.set('descricao', filtro.descricao);
    }
    if(filtro.dataVencimentoInicio){
      parametros = parametros.set(
        'dataVencimentoDe',
        this.datePipe?.transform(filtro.dataVencimentoInicio, 'yyyy-MM-dd')!);

    }
    if(filtro.dataVencimentoFim){
      parametros = parametros.set(
        'dataVencimentoAte',
        this.datePipe?.transform(filtro.dataVencimentoFim, 'yyyy-MM-dd')!);
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`,
    { headers, params: parametros})
      .toPromise()
      .then(response => {
        if (response) {
          return response;
        } else {
          throw new Error('A resposta está vazia.');
        }
      });

  }
}
