import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-entrada',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Detalle de Entrada</h2>
    <p>Información detallada de la entrada</p>
  `
})
export class DetalleEntrada { }
