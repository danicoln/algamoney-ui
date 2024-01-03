import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { LancamentoFiltro } from './lancamentos-pesquisa/model/lancamentos-filtro';
import { Lancamento } from '../core/model';
import { firstValueFrom } from 'rxjs';

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  page: number;
}

@Injectable()
export class LancamentoService {


  filtro = new LancamentoFiltro();
  datePipe?: DatePipe;
  url = 'http://localhost:8080/lancamentos';

  chave: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLWFwaSIsInN1YiI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJleHAiOjE3MDQzMjM3MjJ9.uVkBGLq7dJ8Nw2YDK2IiluXWpJSh3mXFbdsHFOUDIJE';

  constructor(
    private http: HttpClient,
    datePipe?: DatePipe
  ) {
    this.datePipe = datePipe; // Foi necessário colocar o datePipe no construtor para que a implementação de data nos filtros funcionasse.
    //cria um filtro padrão

  }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const headers = new HttpHeaders().set('Authorization', this.chave);
    let parametros = new HttpParams()
      .set('page', filtro.pagina)
      .set('size', filtro.itensPorPagina);

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

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders()
      .set('Authorization', this.chave)
      .set('Content-Type', 'application/json');

    return this.http.put<Lancamento>(`${this.url}/${lancamento.codigo}`,
      lancamento, { headers })
      .toPromise()
      .then((response: Lancamento | undefined) => {
        if (response) {
          return response;
        } else {
          throw new Error('Lançamento não encontrado');
        }
      });
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    const headers = new HttpHeaders()
      .set('Authorization', this.chave);

    return this.http.get<Lancamento>(`${this.url}/${codigo}`,
      { headers })
      .toPromise()
      .then((lancamento: any) => {
        if (lancamento) {

          lancamento.dataVencimento = this.formatarData(lancamento.dataVencimento);
          lancamento.dataPagamento = this.formatarData(lancamento.dataPagamento);
          return lancamento;

        } else {
          throw new Error('Lançamento não encontrado');
        }
      })
      .catch((error: any) => {
        console.error('Erro ao buscar lançamento por código: ', error);
        throw error;
      });
  }

  excluir(codigo: number): Promise<void> {

    const headers = new HttpHeaders().set('Authorization', this.chave);

    return firstValueFrom(this.http.delete<void>(`${this.url}/${codigo}`,
      { headers }));

  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders()
      .append('Authorization', this.chave)
      .append('Content-Type', 'application/json');
    console.log('Dados do Lançamento: ', lancamento);
    return firstValueFrom(this.http.post<Lancamento>(this.url,
      lancamento, { headers }));

  }

 formatarData(data: any): Date | null {
  if(data){
    const partesData = data.split('/');
    return new Date(parseInt(partesData[2]), parseInt(partesData[1]) - 1, parseInt(partesData[0]));
  }
  return null;
 }

}
