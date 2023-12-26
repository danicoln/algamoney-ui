import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

export class PessoaFiltro {
  nome: string = '';
  pagina: number = 0;
  itensPorPagina: number = 5;
}

@Injectable()
export class PessoaService {

  filtro = new PessoaFiltro();
  datePipe?: DatePipe;
  url = 'http://localhost:8080/pessoas'

  constructor(private http: HttpClient, datePipe?: DatePipe) {
    this.datePipe = datePipe;
  }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLWFwaSIsInN1YiI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJleHAiOjE3MDM2MzI2Nzh9.MI47TjDV6EKclanupEnglraiuyBiPueiXPYf-QicrZE');
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
}
