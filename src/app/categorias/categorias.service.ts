import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  url = 'http://localhost:8080/categorias';
  chave: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLWFwaSIsInN1YiI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJleHAiOjE3MDQ3NjAxMTh9.hDPnIMOTwMBDc3awhrqUznNOIWM3lwe6bgBHk8psRYI';

  constructor(private http: HttpClient) { }

  listarTodas(): Promise<any[]> {
    const headers = new HttpHeaders().set('Authorization', this.chave);

      return this.http.get(`${this.url}`, { headers })
      .toPromise()
      .then((response: any) => {

        return response});
  }
}
