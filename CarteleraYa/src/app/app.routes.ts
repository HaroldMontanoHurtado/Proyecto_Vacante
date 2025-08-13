import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    {
        path: 'auth',
        loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
    },
    {
        path: 'peliculas',
        loadComponent: () => import('./features/peliculas/listado-peliculas/listado-peliculas').then(m => m.ListadoPeliculasComponent)
    },
    {
        path: 'compras',
        loadComponent: () => import('./features/compras/listado-compras/listado-compras').then(m => m.ListadoCompras)
    },
    {
        path: 'entradas',
        loadComponent: () => import('./features/entradas/listado-entradas/listado-entradas').then(m => m.ListadoEntradas

        )
    },
    { path: '', redirectTo: '/peliculas', pathMatch: 'full' }
];
