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
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: 'auth/login', loadComponent: () =>
      import('./features/auth/login/login').then(m => m.Login)
  },
  {
    path: 'auth/register', loadComponent: () =>
      import('./features/auth/register/register').then(m => m.Register)
  },
  {
    path: 'peliculas', loadComponent: () =>
      import('./features/peliculas/listado-peliculas/listado-peliculas').then(m => m.ListadoPeliculasComponent)
  },
  {
    path: 'compras', loadComponent: () =>
      import('./features/compras/listado-compras/listado-compras').then(m => m.ListadoCompras)
  },
  {
    path: 'entradas', loadComponent: () =>
      import('./features/entradas/listado-entradas/listado-entradas').then(m => m.ListadoEntradas)
  },
  {
    path: 'entrada/:id', loadComponent: () =>
      import('./features/entradas/detalle-entrada/detalle-entrada').then(m => m.DetalleEntrada)
  },
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
      <a mat-button routerLink="/peliculas">Películas</a>
      <a mat-button routerLink="/compras">Compras</a>
      <a mat-button routerLink="/entradas">Entradas</a>
      <a mat-button routerLink="/auth/login">Login</a>
      <a mat-button routerLink="/auth/register">Register</a>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .spacer { flex: 1 1 auto; }
  `]
})
export class App { }
