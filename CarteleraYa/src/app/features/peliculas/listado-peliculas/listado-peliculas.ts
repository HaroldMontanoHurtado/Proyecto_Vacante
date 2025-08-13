import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

export interface Pelicula {
  titulo: string;
  genero: string;
  duracion: number;
}

const ELEMENT_DATA: Pelicula[] = [
  { titulo: 'Matrix', genero: 'Ciencia Ficción', duracion: 136 },
  { titulo: 'Inception', genero: 'Acción', duracion: 148 },
  { titulo: 'Titanic', genero: 'Drama', duracion: 195 }
];

@Component({
  selector: 'app-listado-peliculas',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  template: `
    <h2>Listado de Películas</h2>
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

      <ng-container matColumnDef="titulo">
        <th mat-header-cell *matHeaderCellDef> Título </th>
        <td mat-cell *matCellDef="let element"> {{element.titulo}} </td>
      </ng-container>

      <ng-container matColumnDef="genero">
        <th mat-header-cell *matHeaderCellDef> Género </th>
        <td mat-cell *matCellDef="let element"> {{element.genero}} </td>
      </ng-container>

      <ng-container matColumnDef="duracion">
        <th mat-header-cell *matHeaderCellDef> Duración (min) </th>
        <td mat-cell *matCellDef="let element"> {{element.duracion}} </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  `,
  styles: [`
    table {
      width: 100%;
      margin-top: 20px;
    }
  `]
})
export class ListadoPeliculasComponent {
  displayedColumns: string[] = ['titulo', 'genero', 'duracion'];
  dataSource = ELEMENT_DATA;
}
