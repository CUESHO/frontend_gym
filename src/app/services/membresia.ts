import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembresiaService {
  private apiUrl = 'http://127.0.0.1:8000/api/membresias/';

  constructor(private http: HttpClient) { }

  // 1. GET (Recuperación múltiple)
  getMembresias(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // 2. GET (Recuperación individual)
  getMembresia(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}/`);
  }

  // 3. POST (Registro)
  createMembresia(membresia: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, membresia);
  }

  // 4. PUT (Actualización)
  updateMembresia(id: number, membresia: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}/`, membresia);
  }

  // 5. DELETE (Eliminación)
  deleteMembresia(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}/`);
  }
}