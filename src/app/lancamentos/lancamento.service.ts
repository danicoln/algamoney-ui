import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { LancamentoFiltro } from './lancamentos-pesquisa/model/lancamentos-filtro';


@Injectable()
export class LancamentoService {

  filtro = new LancamentoFiltro();
  datePipe?: DatePipe;
  url = 'http://localhost:8080/lancamentos';

  chave: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLWFwaSIsInN1YiI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJleHAiOjE3MDM5NTEzNjV9.-a5ZIHT5RE438H7T-KgoeqpO69KV5RSP7YYIHD25RUo';

  constructor(private http: HttpClient, datePipe?: DatePipe) {
    this.datePipe = datePipe; // Foi necessário colocar o datePipe no construtor para que a implementação de data nos filtros funcionasse.
    //cria um filtro padrão

  }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const headers = new HttpHeaders().set('Authorization', this.chave);
    let parametros = new HttpParams();

    parametros = parametros.set('page', filtro.pagina);
    parametros = parametros.set('size', filtro.itensPorPagina);

    if (filtro.descricao) {
      parametros = parametros.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      parametros = parametros.set(
        'dataVencimentoDe',
        this.datePipe?.transform(filtro.dataVencimentoInicio.toUTCString(), 'yyyy-MM-dd')!);
    }

    if (filtro.dataVencimentoFim) {
      parametros = parametros.set(
        'dataVencimentoAte',
        this.datePipe?.transform(filtro.dataVencimentoFim.toUTCString(), 'yyyy-MM-dd')!);
    }

    return this.http.get<any>(`${this.url}?resumo`,
      { headers, params: parametros })
      .toPromise()
      .then((response: any) => {
        const respJson = response;
        const dadosLancamentos = respJson.content;

        const resultado = {
          dadosLancamentos,
          total: response.totalElements
        }
        return resultado;
      });
  }

  excluir(codigo: number): Promise<void>{

    const headers = new HttpHeaders().set('Authorization', this.chave);

    return this.http.delete(`${this.url}/${codigo}`,
    {headers})
    .toPromise()
    .then(() => {});
    /**
     * o método then(() => {}) é utilizado para garantir
     * que a Promise resultante tenha um valor de resolução,
     * mesmo que seja undefined. Isso é feito para
     * corresponder ao tipo de retorno Promise<void>.
     */
  }

  /**
   *
   */
  editar(codigo: number): Promise<any>{
    const headers = new HttpHeaders().set('Authorization', this.chave);

    return this.http.post(`${this.url}/${codigo}`,
    {headers})
    .toPromise()
    .then(() => {});
  }
}
