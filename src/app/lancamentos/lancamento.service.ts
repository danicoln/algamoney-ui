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

  chave: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLWFwaSIsInN1YiI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJleHAiOjE3MDQzMDA0OTN9.SbbPkUKWJWv7k3uBpW-8UHHAZ4npfmHFBh_d18ETXGA';

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
        if(response){
          return response;
        }else{
          throw new Error('Lançamento não encontrado');
        }
      });
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento>{
    return this.http.get<Lancamento>(`${this.url}/${codigo}`)
    .toPromise()
    .then((response: Lancamento | undefined) => {
      if(response){
        return response;
      }else{
        throw new Error('Lançamento não encontrado');
      }
    })
    .catch((error: any) =>{
      console.error('Erro ao buscar lançamento por código: ', error);
      throw error;
    });
  }

  excluir(codigo: number): Promise<void>{

    const headers = new HttpHeaders().set('Authorization', this.chave);

    return firstValueFrom(this.http.delete<void>(`${this.url}/${codigo}`,
    {headers}));

  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders()
    .append('Authorization', this.chave)
    .append('Content-Type', 'application/json');
    console.log('Dados do Lançamento: ', lancamento);
    return firstValueFrom(this.http.post<Lancamento>(this.url,
      lancamento, {headers}));

  }

  //este método foi transf para o cadastro de lancamento. Conferir...
  private converterStringsParaDatas(lancamentos: Lancamento[]){
    for(const lancamento of lancamentos){
      let offset = new Date().getTimezoneOffset() * 60000;

      lancamento.dataVencimento = new Date(new Date(lancamento.dataVencimento!).getTime() + offset);

      if(lancamento.dataPagamento) {
        lancamento.dataPagamento = new Date(new Date(lancamento.dataPagamento).getTime() + offset);
      }
    }
  }
}
