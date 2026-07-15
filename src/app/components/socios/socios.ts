import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SocioService } from '../../services/socio';
import { MembresiaService } from '../../services/membresia';
import { EntrenadorService } from '../../services/entrenador';
import { NotificacionService } from '../../services/notificacion';

@Component({
  selector: 'app-socios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './socios.html',
  styleUrl: './socios.css'
})
export class SociosComponent implements OnInit {
  socios: any[] = [];
  membresias: any[] = [];
  entrenadores: any[] = [];
  
  nuevoSocio = {
    username: '', password: '', first_name: '', last_name: '',
    telefono: '', fecha_nacimiento: '', membresia: '', entrenador: ''
  };
  editando = false;
  idEdicion: number | null = null;

  constructor(
    private socioService: SocioService,
    private membresiaService: MembresiaService,
    private entrenadorService: EntrenadorService,
    private notificacionService: NotificacionService
  ) {}

  ngOnInit(): void {
    this.cargarSocios();
    this.cargarMembresias();
    this.cargarEntrenadores();
  }

  cargarSocios(): void { this.socioService.getSocios().subscribe((data: any) => this.socios = data); }
  cargarMembresias(): void { this.membresiaService.getMembresias().subscribe((data: any) => this.membresias = data); }
  cargarEntrenadores(): void { this.entrenadorService.getEntrenadores().subscribe((data: any) => this.entrenadores = data); }

  guardarSocio(): void {
    if (this.editando && this.idEdicion) {
      this.socioService.updateSocio(this.idEdicion, this.nuevoSocio).subscribe({
        next: () => { this.notificacionService.mostrarExito('Socio actualizado'); this.cargarSocios(); this.cancelarEdicion(); },
        error: () => this.notificacionService.mostrarError('Error al actualizar')
      });
    } else {
      this.socioService.createSocio(this.nuevoSocio).subscribe({
        next: () => { this.notificacionService.mostrarExito('Socio inscrito correctamente'); this.cargarSocios(); this.cancelarEdicion(); },
        error: () => this.notificacionService.mostrarError('Error al registrar usuario')
      });
    }
  }

  eliminarSocio(id: number): void {
    if (confirm('¿Dar de baja definitiva a este socio?')) {
      this.socioService.deleteSocio(id).subscribe({
        next: () => { this.notificacionService.mostrarExito('Socio eliminado'); this.cargarSocios(); },
        error: () => this.notificacionService.mostrarError('Error al eliminar')
      });
    }
  }

  cargarParaEditar(socio: any): void {
    this.editando = true;
    this.idEdicion = socio.id;
    this.nuevoSocio = {
      username: socio.username, password: '', first_name: socio.first_name, last_name: socio.last_name,
      telefono: socio.telefono, fecha_nacimiento: socio.fecha_nacimiento, membresia: socio.membresia, entrenador: socio.entrenador
    };
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.idEdicion = null;
    this.nuevoSocio = { username: '', password: '', first_name: '', last_name: '', telefono: '', fecha_nacimiento: '', membresia: '', entrenador: '' };
  }
}