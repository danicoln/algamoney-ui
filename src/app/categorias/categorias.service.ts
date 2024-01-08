import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  url = 'http://localhost:8080/categorias';
  chave: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLWFwaSIsInN1YiI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJleHAiOjE3MDQ3NTE1MTZ9.d6z5zt4D7Q8z7GLiF99yuTI605dUcsewf0MVcE0BL0E';

  constructor(private http: HttpClient) { }

  listarTodas(): Promise<any[]> {
    const headers = new HttpHeaders().set('Authorization', this.chave);

      return this.http.get(`${this.url}`, { headers })
      .toPromise()
      .then((response: any) => {

        return response});
  }
}
