import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listado-compras',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Compras</h2>
    <p>Aquí se mostrará el historial de compras</p>
  `
})
export class ListadoCompras { }
