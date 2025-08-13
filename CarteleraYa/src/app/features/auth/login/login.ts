import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Login</h2>
    <form>
      <input placeholder="Email" [(ngModel)]="email" name="email" type="email" required/>
      <input placeholder="Contraseña" [(ngModel)]="contrasena" name="contrasena" type="password" required/>
      <button (click)="login()">Ingresar</button>
    </form>
  `
})
export class Login {
  email = '';
  contrasena = '';

  login() {
    console.log('Login:', this.email, this.contrasena);
    // Conectar con backend y generar token JWT
  }
}
