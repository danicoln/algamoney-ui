import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

/**Criamos uma interface para definir um contrato
 * Desta forma, evitamos de cometer algum erro no momento
 * de usar o método pesquisar do service
 */
export interface LancamentoFiltro {
  descricao: string;
}

@Injectable()
export class LancamentoService {


  lancamentosUrl = 'http://localhost:8080/lancamentos'

  constructor( private http: HttpClient) {
    //cria um filtro padrão 
    const filtro: LancamentoFiltro = {descricao: ''};
    this.pesquisar(filtro);
  }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const headers = new HttpHeaders().set('Authorization', 'Basic YWRtaW46YWRtaW4=');
    let parametros = new HttpParams();

    if(filtro.descricao){

      /**Com o método set de parametros, passamos 'descricao' e
       * o valor, ou seja, atribuimos o valor de filtro.descricao
       * à 'descricao.
       */
      parametros = parametros.set('descricao', filtro.descricao);
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
