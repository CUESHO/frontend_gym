import { Routes } from '@angular/router';
import { MembresiasComponent } from './components/membresias/membresias';
import { SociosComponent } from './components/socios/socios';
import { EntrenadoresComponent } from './components/entrenadores/entrenadores';
import { AreasComponent } from './components/areas/areas';
import { MaquinasComponent } from './components/maquinas/maquinas';

export const routes: Routes = [
  { path: 'membresias', component: MembresiasComponent },
  { path: 'socios', component: SociosComponent },
  { path: 'entrenadores', component: EntrenadoresComponent },
  { path: 'areas', component: AreasComponent },
  { path: 'maquinas', component: MaquinasComponent },
  
  // Ruta por defecto: si el usuario entra a localhost:4200, lo mandamos a membresias
  { path: '', redirectTo: 'membresias', pathMatch: 'full' },
  // Ruta comodín por si escriben mal la URL
  { path: '**', redirectTo: 'membresias' }
];