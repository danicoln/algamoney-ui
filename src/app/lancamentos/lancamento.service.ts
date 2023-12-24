import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { LancamentoFiltro } from './lancamentos-pesquisa/model/lancamentos-filtro';


@Injectable()
export class LancamentoService {

  filtro = new LancamentoFiltro();
  datePipe?: DatePipe;
  url = 'http://localhost:8080/lancamentos'

  constructor( private http: HttpClient, datePipe?: DatePipe) {
    this.datePipe = datePipe; // Foi necessário colocar o datePipe no construtor para que a implementação de data nos filtros funcionasse.
    //cria um filtro padrão

  }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLWFwaSIsInN1YiI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJleHAiOjE3MDM0NDMxNDZ9.UFmCiqGkKGjjWa2YR8LNSI3mMwIW7GEFZzn5e06KXhA');
    let parametros = new HttpParams();

    parametros = parametros.set('page', filtro.pagina.toString());
    parametros = parametros.set('size', filtro.itensPorPagina.toString());

    console.log(filtro.pagina);
    console.log(filtro.itensPorPagina);

    if(filtro.descricao){
      parametros = parametros.set('descricao', filtro.descricao);
    }
    if(filtro.dataVencimentoInicio){
      parametros = parametros.set(
        'dataVencimentoDe',
        this.datePipe?.transform(filtro.dataVencimentoInicio.toUTCString(), 'yyyy-MM-dd')!);

    }
    if(filtro.dataVencimentoFim){
      parametros = parametros.set(
        'dataVencimentoAte',
        this.datePipe?.transform(filtro.dataVencimentoFim.toUTCString(), 'yyyy-MM-dd')!);
    }

    return this.http.get(`${this.url}?resumo`,
    { headers, params: parametros})
      .toPromise()
      .then((response: any) => {

        console.log('Resposta:' , response);
        console.log('Total de Elementos: ' , response.totalElements);

        //const respJson = response;
        const lancamentos = response;

        const resultado = {
         lancamentos,
         total: response.totalElements

       };

       console.log(resultado)

       return resultado.lancamentos;

      });


    }
  }
