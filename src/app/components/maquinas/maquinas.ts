import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaquinaService } from '../../services/maquina';
import { AreaService } from '../../services/area';
import { NotificacionService } from '../../services/notificacion';

@Component({
  selector: 'app-maquinas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './maquinas.html',
  styleUrl: './maquinas.css'
})
export class MaquinasComponent implements OnInit {
  maquinas: any[] = [];
  areas: any[] = []; // Para llenar el select desplegable
  nuevaMaquina = { nombre: '', estado: 'Operativa', area: '' };
  editando = false;
  idEdicion: number | null = null;

  constructor(
    private maquinaService: MaquinaService,
    private areaService: AreaService,
    private notificacionService: NotificacionService
  ) {}

  ngOnInit(): void {
    this.cargarMaquinas();
    this.cargarAreas();
  }

  cargarMaquinas(): void { this.maquinaService.getMaquinas().subscribe((data: any) => this.maquinas = data); }
  cargarAreas(): void { this.areaService.getAreas().subscribe((data: any) => this.areas = data); }

  guardarMaquina(): void {
    if (this.editando && this.idEdicion) {
      this.maquinaService.updateMaquina(this.idEdicion, this.nuevaMaquina).subscribe({
        next: () => { this.notificacionService.mostrarExito('Máquina actualizada'); this.cargarMaquinas(); this.cancelarEdicion(); },
        error: () => this.notificacionService.mostrarError('Error al actualizar')
      });
    } else {
      this.maquinaService.createMaquina(this.nuevaMaquina).subscribe({
        next: () => { this.notificacionService.mostrarExito('Máquina añadida al inventario'); this.cargarMaquinas(); this.cancelarEdicion(); },
        error: () => this.notificacionService.mostrarError('Error al registrar')
      });
    }
  }

  eliminarMaquina(id: number): void {
    if (confirm('¿Dar de baja máquina?')) {
      this.maquinaService.deleteMaquina(id).subscribe({
        next: () => { this.notificacionService.mostrarExito('Máquina eliminada'); this.cargarMaquinas(); },
        error: () => this.notificacionService.mostrarError('Error al eliminar')
      });
    }
  }

  cargarParaEditar(maquina: any): void {
    this.editando = true;
    this.idEdicion = maquina.id;
    this.nuevaMaquina = { nombre: maquina.nombre, estado: maquina.estado, area: maquina.area };
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.idEdicion = null;
    this.nuevaMaquina = { nombre: '', estado: 'Operativa', area: '' };
  }
}