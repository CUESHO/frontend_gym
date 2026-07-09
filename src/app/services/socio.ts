import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocioService {
  // URL exacta de tu endpoint de Django
  private apiUrl = 'http://127.0.0.1:8000/api/socios/';

  constructor(private http: HttpClient) { }

  getSocios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getSocio(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}/`);
  }

  createSocio(socio: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, socio);
  }

  updateSocio(id: number, socio: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}/`, socio);
  }

  deleteSocio(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}/`);
  }
}