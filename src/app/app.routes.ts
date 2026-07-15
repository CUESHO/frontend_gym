import { Routes } from '@angular/router';
import { MembresiasComponent } from './components/membresias/membresias';
import { AreasComponent } from './components/areas/areas';
// Aquí importaremos los demás conforme los vayamos haciendo
// import { SociosComponent } from './components/socios/socios.ts';
// import { EntrenadoresComponent } from './components/entrenadores/entrenadores.ts';
// import { AreasComponent } from './components/areas/areas.ts';
// import { MaquinasComponent } from './components/maquinas/maquinas.ts';

export const routes: Routes = [
  { path: 'membresias', component: MembresiasComponent },
  // { path: 'socios', component: SociosComponent },
  // { path: 'entrenadores', component: EntrenadoresComponent },
  { path: 'areas', component: AreasComponent },
  // { path: 'maquinas', component: MaquinasComponent },
  
  // Ruta por defecto: si el usuario entra a localhost:4200, lo mandamos a membresias
  { path: '', redirectTo: 'membresias', pathMatch: 'full' },
  // Ruta comodín por si escriben mal la URL
  { path: '**', redirectTo: 'membresias' }
];