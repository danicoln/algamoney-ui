import { DatePipe, formatDate } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { LancamentoFiltro } from './lancamentos-pesquisa/model/lancamentos-filtro';
import { Observable, firstValueFrom } from 'rxjs';
import { Lancamento } from '../core/model';
import { format, isValid } from 'date-fns';

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

  chave: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLWFwaSIsInN1YiI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJleHAiOjE3MDQ3NjAxMTh9.hDPnIMOTwMBDc3awhrqUznNOIWM3lwe6bgBHk8psRYI';
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
        this.datePipe?.transform(filtro.dataVencimentoInicio, 'yyyy-MM-dd')!);
    }

    if (filtro.dataVencimentoFim) {
      parametros = parametros.set(
        'dataVencimentoAte',
        this.datePipe?.transform(filtro.dataVencimentoFim, 'yyyy-MM-dd')!);
    }
    return this.http.get<any>(`${this.url}?resumo`,
      { headers, params: parametros })
      .toPromise()
      .then((response: any) => {
        const respJson = response;
        const dadosLancamentos = respJson.content;

        const resultado = {
          dadosLancamentos,
          total: response.totalElements,
        };
        return resultado;
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

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders()
      .set('Authorization', this.chave)
      .set('Content-Type', 'application/json');

      this.conversorDeData([lancamento]);

    console.log('Dados antes da requisição HTTP: ', lancamento);
    return firstValueFrom(this.http.put<Lancamento>(`${this.url}/${lancamento.codigo}`,
      lancamento, { headers }));
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    const headers = new HttpHeaders()
      .set('Authorization', this.chave);

    return this.http.get(`${this.url}/${codigo}`,
      { headers })
      .toPromise()
      .then((response: any) => {
        const lancamento = response as Lancamento;

        this.conversorDeData([lancamento]);

        return lancamento;
      })
      .catch((error: any) => {
        console.error('Erro ao buscar lançamento por código: ', error);
        throw error;
      });
  }

  //Se os atributos forem do tipo Date
  conversorDeData(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      if (lancamento.dataVencimento) {

        if (isValid(lancamento.dataVencimento)) {
          lancamento.dataVencimento = new Date(format(lancamento.dataVencimento, 'dd/MM/yyyy'));
        } else {
          console.error('Data inválida após a conversão.')
        }

      } else {
        console.error('Data inválida ou indefinida.');
      }
      if (lancamento.dataPagamento) {

        if (isValid(lancamento.dataPagamento)) {
          lancamento.dataPagamento = new Date(format(lancamento.dataPagamento, 'dd/MM/yyyy'));
        } else {
          console.error('Data inválida após a conversão.')

        }
      } else {
        console.error('Data inválida ou indefinida.');

      }
    }
  }

  /**

   private converterStringsParaDatas(lancamentos: Lancamento[]) {

     const dateFormadata = DateTimeFormatter.ofPattern('yyyy-MM-dd');

     for (const lancamento of lancamentos) {
       if(lancamento.dataVencimento !== undefined){
         const localDataVencimento = LocalDate.parse(lancamento.dataVencimento, dateFormadata);
         lancamento.dataVencimento = new Date(
           localDataVencimento.year(),
           localDataVencimento.monthValue() - 1,
           localDataVencimento.dayOfMonth()).toString();
       }

       if (lancamento.dataPagamento !== undefined) {
         const localDataPagamento = LocalDate.parse(lancamento.dataPagamento, dateFormadata);
         lancamento.dataPagamento = new Date(
           localDataPagamento.year(),
           localDataPagamento.monthValue() - 1,
           localDataPagamento.dayOfMonth()).toString();
       }
     }
   }
   *
   *
   *private converterStringsParaDatas(lancamentos: Lancamento[]) {
   for (const lancamento of lancamentos) {
     let offset = new Date().getTimezoneOffset() * 60000;

     lancamento.dataVencimento = new Date(new Date(lancamento.dataVencimento!).getTime() + offset);

     if (lancamento.dataPagamento) {
       lancamento.dataPagamento = new Date(new Date(lancamento.dataPagamento).getTime() + offset);
      }
   }
 }
   */

}
