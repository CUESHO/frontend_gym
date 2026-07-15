import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EntrenadorService } from '../../services/entrenador';
import { NotificacionService } from '../../services/notificacion';

@Component({
  selector: 'app-entrenadores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './entrenadores.html',
  styleUrl: './entrenadores.css'
})
export class EntrenadoresComponent implements OnInit {
  entrenadores: any[] = [];
  nuevoEntrenador = { nombre: '', especialidad: '', turno: 'Matutino' };
  editando = false;
  idEdicion: number | null = null;

  constructor(
    private entrenadorService: EntrenadorService,
    private notificacionService: NotificacionService
  ) {}

  ngOnInit(): void { this.cargarEntrenadores(); }

  cargarEntrenadores(): void {
    this.entrenadorService.getEntrenadores().subscribe((data: any) => this.entrenadores = data);
  }

  guardarEntrenador(): void {
    if (this.editando && this.idEdicion) {
      this.entrenadorService.updateEntrenador(this.idEdicion, this.nuevoEntrenador).subscribe({
        next: () => { this.notificacionService.mostrarExito('Entrenador actualizado'); this.cargarEntrenadores(); this.cancelarEdicion(); },
        error: () => this.notificacionService.mostrarError('Error al actualizar')
      });
    } else {
      this.entrenadorService.createEntrenador(this.nuevoEntrenador).subscribe({
        next: () => { this.notificacionService.mostrarExito('Entrenador registrado'); this.cargarEntrenadores(); this.cancelarEdicion(); },
        error: () => this.notificacionService.mostrarError('Error al registrar')
      });
    }
  }

  eliminarEntrenador(id: number): void {
    if (confirm('¿Eliminar entrenador?')) {
      this.entrenadorService.deleteEntrenador(id).subscribe({
        next: () => { this.notificacionService.mostrarExito('Entrenador eliminado'); this.cargarEntrenadores(); },
        error: () => this.notificacionService.mostrarError('Error al eliminar')
      });
    }
  }

  cargarParaEditar(entrenador: any): void {
    this.editando = true;
    this.idEdicion = entrenador.id;
    this.nuevoEntrenador = { nombre: entrenador.nombre, especialidad: entrenador.especialidad, turno: entrenador.turno };
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.idEdicion = null;
    this.nuevoEntrenador = { nombre: '', especialidad: '', turno: 'Matutino' };
  }
}