import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl = environment.apiUrl + '/api/peliculas';

  constructor(private http: HttpClient) { }

  getPeliculas(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getPelicula(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createPelicula(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  updatePelicula(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deletePelicula(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
