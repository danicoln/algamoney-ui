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

  chave: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLWFwaSIsInN1YiI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJleHAiOjE3MDM4MTIwMTR9.FMNhfQVuLn4c3zxao8ErzZmH0EW89V4vR_sYJySwh6I';

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

  excluir(codigo: number): Promise<void>{

    const headers = new HttpHeaders().set('Authorization', this.chave);

    return this.http.delete(`${this.url}/${codigo}`,
    {headers})
    .toPromise()
    .then(() => {});
  }
}
