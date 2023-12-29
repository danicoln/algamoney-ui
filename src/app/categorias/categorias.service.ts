import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  url = 'http://localhost:8080/categorias';
  chave: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLWFwaSIsInN1YiI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJleHAiOjE3MDM4MDQ2NDd9.0qVQTjawOOY0pYWyAV9oD1vv_21krOPoXtg_rIbeL40';

  constructor(private http: HttpClient) { }

  listarTodas(): Promise<any>{
    const headers = new HttpHeaders().set('Authorization', this.chave);

    return this.http.get<any>(`${this.url}`, {headers})

    .toPromise()
    .then((response: any) => {
      const categorias = response.content;

      return categorias;
    });
  }
}
