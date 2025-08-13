import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () =>
            import('./features/auth/auth-module').then(m => m.AuthModule)
    },
    {
        path: 'peliculas',
        canActivate: [AuthGuard],
        loadChildren: () =>
            import('./features/peliculas/peliculas-module').then(m => m.PeliculasModule)
    },
    {
        path: 'compras',
        canActivate: [AuthGuard],
        loadChildren: () =>
            import('./features/compras/compras-module').then(m => m.ComprasModule)
    },
    {
        path: 'entradas',
        canActivate: [AuthGuard],
        loadChildren: () =>
            import('./features/entradas/entradas-module').then(m => m.EntradasModule)
    },
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' }
];
