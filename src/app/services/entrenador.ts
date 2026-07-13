import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntrenadorService {
  private apiUrl = 'http://127.0.0.1:8000/api/entrenadores/';

  constructor(private http: HttpClient) { }

  getEntrenadores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getEntrenador(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}/`);
  }

  createEntrenador(entrenador: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, entrenador);
  }

  updateEntrenador(id: number, entrenador: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}/`, entrenador);
  }

  deleteEntrenador(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}/`);
  }
}