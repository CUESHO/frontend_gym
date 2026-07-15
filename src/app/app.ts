import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule], // RouterModule es vital para los enlaces
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'FitFlow Gym';
}