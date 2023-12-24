import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';


export class LancamentoFiltro {
  descricao?: string;
  dataVencimentoInicio?: Date;
  dataVencimentoFim?: Date;
  pagina: number = 0;
  itensPorPagina: number = 5;
}

@Injectable()
export class LancamentoService {

  filtro = new LancamentoFiltro();
  datePipe?: DatePipe;
  lancamentosUrl = 'http://localhost:8080/lancamentos'

  constructor( private http: HttpClient, datePipe?: DatePipe) {
    this.datePipe = datePipe; // Foi necessário colocar o datePipe no construtor para que a implementação de data nos filtros funcionasse.
    //cria um filtro padrão

  }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLWFwaSIsInN1YiI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJleHAiOjE3MDM0MzAyMjJ9.qJ6T6TltgPXMSGd2pV9U9g8rGmonT2LIcMqysiGp47U');
    let parametros = new HttpParams();

    parametros.set('page', filtro.pagina.toString());
    parametros.set('size', filtro.itensPorPagina.toString());

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

    return this.http.get(`${this.lancamentosUrl}?resumo`,
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
