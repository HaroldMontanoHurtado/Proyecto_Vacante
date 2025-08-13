import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../../core/services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <h2>Registro de Usuario</h2>
    <form (ngSubmit)="registrar()">
      <input placeholder="Nombre" [(ngModel)]="nombre" name="nombre" required/>
      <input placeholder="Apellido" [(ngModel)]="apellido" name="apellido" required/>
      <input placeholder="Email" [(ngModel)]="email" name="email" type="email" required/>
      <input placeholder="Teléfono" [(ngModel)]="telefono" name="telefono" required/>
      <input placeholder="Contraseña" [(ngModel)]="contrasena" name="contrasena" type="password" required/>
      <button type="submit">Registrarse</button>
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

  constructor(private usuarioService: UsuarioService) { }

  registrar() {
    const usuario = {
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      telefono: this.telefono,
      contrasena: this.contrasena,
      rol: this.rol
    };

    this.usuarioService.registrarUsuario(usuario).subscribe({
      next: (res) => {
        console.log('Usuario registrado:', res);
        alert('Registro exitoso');
      },
      error: (err) => {
        console.error('Error al registrar:', err);
        alert('Error en el registro');
      }
    });
  }
}
