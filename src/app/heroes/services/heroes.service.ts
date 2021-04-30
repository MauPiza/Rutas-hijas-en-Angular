import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RESTHeroeResponse } from '../interfaces/heroes.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  //Este endpoint lo creamos en los environment para usarlo de molde
  private endPoint: string = environment.baseURL;

  constructor(private httpClient: HttpClient) {}

  obtenerHeroes(): Observable<RESTHeroeResponse[]> {
    return this.httpClient.get<RESTHeroeResponse[]>(`${this.endPoint}/heroes`);
  }

  obtenerHeroePorID(id: string): Observable<RESTHeroeResponse> {
    return this.httpClient.get<RESTHeroeResponse>(
      `${this.endPoint}/heroes/${id}`
    );
  }

  obtenerSugerencias(termino: string): Observable<RESTHeroeResponse[]> {
    const limit = '&_limit=5';
    return this.httpClient.get<RESTHeroeResponse[]>(
      `${this.endPoint}/heroes?q=${termino + limit}`
    );
  }

  agregarHeroe(heroe: RESTHeroeResponse): Observable<RESTHeroeResponse> {
    return this.httpClient.post<RESTHeroeResponse>(
      `${this.endPoint}/heroes/`,
      heroe
    );
  }

  editarHeroe(heroe: RESTHeroeResponse): Observable<RESTHeroeResponse> {
    return this.httpClient.put<RESTHeroeResponse>(
      `${this.endPoint}/heroes/${heroe.id}`,
      heroe
    );
  }
  eliminarHeroe(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.endPoint}/heroes/${id}`);
  }
}
