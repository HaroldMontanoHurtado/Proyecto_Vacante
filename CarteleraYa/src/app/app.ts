import { Component } from '@angular/core';
import { RouterOutlet, Routes } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { ListadoPeliculasComponent } from './features/peliculas/listado-peliculas/listado-peliculas';
import { ListadoCompras } from './features/compras/listado-compras/listado-compras';
import { DetalleEntrada } from './features/entradas/detalle-entrada/detalle-entrada';
import { ListadoEntradas } from './features/entradas/listado-entradas/listado-entradas';

export const routes: Routes = [
  { path: '', redirectTo: '/peliculas', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'peliculas', component: ListadoPeliculasComponent },
  { path: 'compras', component: ListadoCompras },
  { path: 'entradas', component: ListadoEntradas },
  { path: 'entrada/:id', component: DetalleEntrada },
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule
  ],
  template: `
    <mat-toolbar color="primary">
      <span>CarteleraYA</span>
      <span class="spacer"></span>
      <a mat-button routerLink="/">Películas</a>
      <a mat-button routerLink="/compras">Compras</a>
      <a mat-button routerLink="/entradas">Entradas</a>
      <a mat-button routerLink="/login">Login</a>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .spacer { flex: 1 1 auto; }
  `]
})
export class App { }
