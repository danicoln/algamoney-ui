import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Pessoa } from '../core/model';
import { firstValueFrom } from 'rxjs';

export class PessoaFiltro {
  nome: string = '';
  pagina: number = 0;
  itensPorPagina: number = 5;
}

@Injectable()
export class PessoaService {

  chave: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLWFwaSIsInN1YiI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJleHAiOjE3MDQ3NjAxMTh9.hDPnIMOTwMBDc3awhrqUznNOIWM3lwe6bgBHk8psRYI';

  filtro = new PessoaFiltro();
  datePipe?: DatePipe;
  url = 'http://localhost:8080/pessoas'

  constructor(private http: HttpClient, datePipe?: DatePipe) {
    this.datePipe = datePipe;
  }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const headers = new HttpHeaders().set('Authorization', this.chave);
    let parametros = new HttpParams();

    parametros = parametros.set('page', filtro.pagina);
    parametros = parametros.set('size', filtro.itensPorPagina);

    if (filtro.nome) {
      parametros = parametros.set('nome', filtro.nome);
    }

    return this.http.get<any>(`${this.url}`,
      { headers, params: parametros })
      .toPromise()
      .then((response: any) => {
        const respJson = response;
        const dadosPessoas = respJson.content;

        const resultado = {
          dadosPessoas,
          total: response.totalElements
        }
        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {

    const headers = new HttpHeaders().set('Authorization', this.chave);

    return this.http.delete(`${this.url}/${codigo}`,
      { headers })
      .toPromise()
      .then(() => { });
  }

  changeStatus(codigo: number, ativo: boolean): Promise<void> {

    let headers = new HttpHeaders().set('Authorization', this.chave);

    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.url}/${codigo}/ativo`,
      ativo, { headers })
      .toPromise()
      .then(() => { });

  }

  listarPessoas(): Promise<any[]> {
    const headers = new HttpHeaders().set('Authorization', this.chave);

    return this.http.get(`${this.url}`, { headers })
      .toPromise()
      .then((response: any) => {
        return response
      });
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa>{
    const headers = new HttpHeaders()
    .append('Authorization', this.chave)
    .append('Content-Type', 'application/json');
    console.log('[PessoaService]:Pessoa cadastrada: ', pessoa);
    return firstValueFrom(this.http.post<Pessoa>(this.url, pessoa, {headers}));
  }
}
