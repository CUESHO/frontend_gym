import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  // Este servicio NO inyecta HttpClient porque es un servicio puramente local
  constructor() { }

  // Método para lanzar una alerta estética de éxito
  mostrarExito(mensaje: string): void {
    alert(`✅ SUCCESS: ${mensaje}`);
  }

  // Método para lanzar una alerta de error
  mostrarError(mensaje: string): void {
    alert(`❌ ERROR: ${mensaje}`);
  }
}