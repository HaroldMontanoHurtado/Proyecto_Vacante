import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Pelicula {
  id?: number;
  titulo: string;
  descripcion: string;
  duracion_min: number;
  clasificacion: string;
  genero: string;
  imagen_url: string;
  estado: 'activo' | 'inactivo';
}

const PELICULAS: Pelicula[] = [];

@Component({
  selector: 'app-listado-peliculas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Administración de Películas</h2>
    
    <h3>Crear / Editar Película</h3>
    <form>
      <input placeholder="Título" [(ngModel)]="pelicula.titulo" name="titulo"/>
      <input placeholder="Género" [(ngModel)]="pelicula.genero" name="genero"/>
      <input placeholder="Duración (min)" [(ngModel)]="pelicula.duracion_min" name="duracion_min" type="number"/>
      <input placeholder="Clasificación" [(ngModel)]="pelicula.clasificacion" name="clasificacion"/>
      <input placeholder="URL Imagen" [(ngModel)]="pelicula.imagen_url" name="imagen_url"/>
      <select [(ngModel)]="pelicula.estado" name="estado">
        <option value="activo">Activo</option>
        <option value="inactivo">Inactivo</option>
      </select>
      <button (click)="guardar()">Guardar</button>
    </form>

    <h3>Listado de Películas</h3>
    <ul>
      <li *ngFor="let p of peliculas">
        {{p.titulo}} ({{p.estado}})
        <button (click)="editar(p)">Editar</button>
        <button (click)="inhabilitar(p)">Inhabilitar</button>
      </li>
    </ul>
  `
})
export class ListadoPeliculasComponent {
  peliculas: Pelicula[] = PELICULAS;
  pelicula: Pelicula = { titulo: '', descripcion: '', duracion_min: 0, clasificacion: '', genero: '', imagen_url: '', estado: 'activo' };

  guardar() {
    if (!this.pelicula.id) {
      this.pelicula.id = Date.now();
      this.peliculas.push({ ...this.pelicula });
    } else {
      const index = this.peliculas.findIndex(p => p.id === this.pelicula.id);
      this.peliculas[index] = { ...this.pelicula };
    }
    this.pelicula = { titulo: '', descripcion: '', duracion_min: 0, clasificacion: '', genero: '', imagen_url: '', estado: 'activo' };
  }

  editar(p: Pelicula) {
    this.pelicula = { ...p };
  }

  inhabilitar(p: Pelicula) {
    p.estado = 'inactivo';
  }
}