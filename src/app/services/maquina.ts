import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaquinaService {
  private apiUrl = 'http://127.0.0.1:8000/api/maquinas/';

  constructor(private http: HttpClient) { }

  getMaquinas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getMaquina(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}/`);
  }

  createMaquina(maquina: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, maquina);
  }

  updateMaquina(id: number, maquina: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}/`, maquina);
  }

  deleteMaquina(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}/`);
  }
}