import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {
        path: 'auth/register',
        loadComponent: () =>
            import('./features/auth/register/register').then(
                (m) => m.Register
            ),
    },
    {
        path: 'auth/login',
        loadComponent: () =>
            import('./features/auth/login/login').then((m) => m.Login),
    },
    
    {
        path: 'peliculas',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./features/peliculas/listado-peliculas/listado-peliculas').then(
                (m) => m.ListadoPeliculasComponent
            ),
    },
    {
        path: 'compras',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./features/compras/listado-compras/listado-compras').then(
                (m) => m.ListadoCompras
            ),
    },
    {
        path: 'entradas',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./features/entradas/listado-entradas/listado-entradas').then(
                (m) => m.ListadoEntradas
            ),
    },
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
];
