import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary">
      <span>CarteleraYA</span>
      <span class="spacer"></span>
      <button mat-button routerLink="/peliculas">Películas</button>
      <button mat-button routerLink="/compras">Compras</button>
      <button mat-button routerLink="/entradas">Entradas</button>
      <button mat-button routerLink="/auth/login">Login</button>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .spacer { flex: 1 1 auto; }
  `]
})
export class App { }
