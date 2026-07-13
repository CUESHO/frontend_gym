import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MembresiaService } from '../../services/membresia';
import { NotificacionService } from '../../services/notificacion';

@Component({
  selector: 'app-membresias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './membresias.html',
  styleUrl: './membresias.css'
})
export class MembresiasComponent implements OnInit {
  membresias: any[] = [];
  nuevaMembresia = { nombre: '', precio: null, duracion_dias: null };
  
  // Nuevas variables para controlar la edición
  editando: boolean = false;
  idEdicion: number | null = null;

  constructor(
    private membresiaService: MembresiaService,
    private notificacionService: NotificacionService
  ) { }

  ngOnInit(): void {
    this.cargarMembresias();
  }

  // C (Create) y U (Update) combinados en el mismo botón
  guardarMembresia(): void {
    if (this.editando && this.idEdicion) {
      // Modo Edición (PUT)
      this.membresiaService.updateMembresia(this.idEdicion, this.nuevaMembresia).subscribe({
        next: (res: any) => {
          this.notificacionService.mostrarExito('Membresía actualizada con éxito');
          this.cargarMembresias();
          this.cancelarEdicion();
        },
        error: (err: any) => this.notificacionService.mostrarError('Error al actualizar')
      });
    } else {
      // Modo Creación (POST)
      this.membresiaService.createMembresia(this.nuevaMembresia).subscribe({
        next: (res: any) => {
          this.notificacionService.mostrarExito('Membresía registrada correctamente');
          this.cargarMembresias(); 
          this.cancelarEdicion(); 
        },
        error: (err: any) => this.notificacionService.mostrarError('Hubo un problema al guardar')
      });
    }
  }

  // R (Read)
  cargarMembresias(): void {
    this.membresiaService.getMembresias().subscribe((data: any) => {
      this.membresias = data;
    });
  }

  // D (Delete)
  eliminarMembresia(id: number): void {
    if(confirm('¿Estás seguro de eliminar este plan?')) {
      this.membresiaService.deleteMembresia(id).subscribe({
        next: (res: any) => {
          this.notificacionService.mostrarExito('Membresía eliminada');
          this.cargarMembresias();
        },
        error: (err: any) => this.notificacionService.mostrarError('Error al eliminar')
      });
    }
  }

  // Métodos auxiliares para la interfaz
  cargarParaEditar(plan: any): void {
    this.editando = true;
    this.idEdicion = plan.id;
    // Hacemos una copia del objeto para no afectar la tabla directamente mientras escribimos
    this.nuevaMembresia = { nombre: plan.nombre, precio: plan.precio, duracion_dias: plan.duracion_dias };
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.idEdicion = null;
    this.nuevaMembresia = { nombre: '', precio: null, duracion_dias: null };
  }
}