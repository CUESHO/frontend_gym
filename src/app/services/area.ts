import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private apiUrl = 'http://127.0.0.1:8000/api/areas/';

  constructor(private http: HttpClient) { }

  getAreas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getArea(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}/`);
  }

  createArea(area: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, area);
  }

  updateArea(id: number, area: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}/`, area);
  }

  deleteArea(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}/`);
  }
}