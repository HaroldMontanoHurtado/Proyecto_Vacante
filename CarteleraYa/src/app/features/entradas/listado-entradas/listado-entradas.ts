import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listado-entradas',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Entradas</h2>
    <p>Aquí se mostrarán las entradas del usuario</p>
  `
})
export class ListadoEntradas { }
