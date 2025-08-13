import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Registro de Usuario</h2>
    <form>
      <input placeholder="Nombre" [(ngModel)]="nombre" name="nombre" required/>
      <input placeholder="Apellido" [(ngModel)]="apellido" name="apellido" required/>
      <input placeholder="Email" [(ngModel)]="email" name="email" type="email" required/>
      <input placeholder="Teléfono" [(ngModel)]="telefono" name="telefono" required/>
      <input placeholder="Contraseña" [(ngModel)]="contrasena" name="contrasena" type="password" required/>
      <select [(ngModel)]="rol" name="rol">
        <option value="cliente">Cliente</option>
        <option value="admin">Admin</option>
      </select>
      <button (click)="registrar()">Registrarse</button>
    </form>
  `
})
export class Register {
  nombre = '';
  apellido = '';
  email = '';
  telefono = '';
  contrasena = '';
  rol = 'cliente';

  registrar() {
    console.log('Registro:', { nombre: this.nombre, apellido: this.apellido, email: this.email, telefono: this.telefono, rol: this.rol });
    // Aquí luego se conectará con el backend
  }
}
