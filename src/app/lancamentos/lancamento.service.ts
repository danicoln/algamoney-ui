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

  chave: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLWFwaSIsInN1YiI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJleHAiOjE3MDM5OTQzNDR9.kGNNmfj752ijCgFYPstwf5cS4gScL2TG0KUEuzfPk1U';

  constructor(private http: HttpClient, datePipe?: DatePipe) {
    this.datePipe = datePipe; // Foi necessário colocar o datePipe no construtor para que a implementação de data nos filtros funcionasse.
    //cria um filtro padrão

  }

  pesquisar(filtro: LancamentoFiltro): Promise<Page<Lancamento>> {
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

    return firstValueFrom(this.http.get<Page<Lancamento>>(`${this.url}?resumo`,
      { headers, params: parametros }));

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
}
