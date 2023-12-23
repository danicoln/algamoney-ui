import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class LancamentoService {


  lancamentosUrl = 'http://localhost:8080/lancamentos'

  constructor( private http: HttpClient) {
    this.pesquisar();
  }

  pesquisar(): Promise<any> {
    return this.http.get(`${this.lancamentosUrl}?resumo`)
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
