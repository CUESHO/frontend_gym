import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AreaService } from '../../services/area';
import { NotificacionService } from '../../services/notificacion';

@Component({
  selector: 'app-areas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './areas.html',
  styleUrl: './areas.css'
})
export class AreasComponent implements OnInit {
  areas: any[] = [];
  nuevaArea = { nombre: '', descripcion: '' };
  
  editando: boolean = false;
  idEdicion: number | null = null;

  constructor(
    private areaService: AreaService,
    private notificacionService: NotificacionService
  ) { }

  ngOnInit(): void {
    this.cargarAreas();
  }

  guardarArea(): void {
    if (this.editando && this.idEdicion) {
      this.areaService.updateArea(this.idEdicion, this.nuevaArea).subscribe({
        next: (res: any) => {
          this.notificacionService.mostrarExito('Área actualizada con éxito');
          this.cargarAreas();
          this.cancelarEdicion();
        },
        error: (err: any) => this.notificacionService.mostrarError('Error al actualizar')
      });
    } else {
      this.areaService.createArea(this.nuevaArea).subscribe({
        next: (res: any) => {
          this.notificacionService.mostrarExito('Área registrada correctamente');
          this.cargarAreas(); 
          this.cancelarEdicion(); 
        },
        error: (err: any) => this.notificacionService.mostrarError('Hubo un problema al guardar')
      });
    }
  }

  cargarAreas(): void {
    this.areaService.getAreas().subscribe((data: any) => {
      this.areas = data;
    });
  }

  eliminarArea(id: number): void {
    if(confirm('¿Estás seguro de eliminar esta área?')) {
      this.areaService.deleteArea(id).subscribe({
        next: (res: any) => {
          this.notificacionService.mostrarExito('Área eliminada');
          this.cargarAreas();
        },
        error: (err: any) => this.notificacionService.mostrarError('Error al eliminar')
      });
    }
  }

  cargarParaEditar(area: any): void {
    this.editando = true;
    this.idEdicion = area.id;
    this.nuevaArea = { nombre: area.nombre, descripcion: area.descripcion };
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.idEdicion = null;
    this.nuevaArea = { nombre: '', descripcion: '' };
  }
}
