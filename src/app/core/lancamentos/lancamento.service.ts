import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class LancamentoService implements OnInit{

  content: any[] = [];

  /**Em outra aula, iremos remover esse cara */
  lancamentosUrl = 'http://localhost:8080/lancamentos'

  constructor( private http: HttpClient) { }

  ngOnInit() {
      this.pesquisar().then(result =>
        this.content = result);
  }

  pesquisar(): Promise<any> {
    // const headers = new Headers();
    //headers.append('Authorization', 'Basic $3NH4QuAlQuEr') // na aula foi configurada a autenticação, mas no nosso caso, deu certo sem esta config.
    // problmas de versão precisaria passar na requisição
    //return this.http.get(`${this.lancamentosUrl}?resumo`, {headers: Headers})
    return this.http.get(`${this.lancamentosUrl}?resumo`)
    .toPromise()
    .then(response => {
      if(response){
        console.log(response)
        return response.content;
      }else{
        throw new Error('A resposta está vazia.')
      }
    })

    /***/

    //.catch(this.handleError); // n implementamos ainda este metodo
  }
}
