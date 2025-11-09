import { Component, inject, OnInit, signal, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { UsuarioService } from '../../../services/usuario'; 
import { RouterLink } from '@angular/router'; // <-- 1. IMPORTA RouterLink

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink // <-- 2. AÑADE RouterLink
  ],
  templateUrl: './gestion-usuarios.html',
  styleUrl: './gestion-usuarios.css'
})
export class GestionUsuarios implements OnInit { 

  private usuarioService = inject(UsuarioService);
  private platformId = inject(PLATFORM_ID);
  
  usuarios = signal<any[]>([]);

  constructor() { }

  ngOnInit(): void {
    // Solo carga datos si estás en el navegador
    if (isPlatformBrowser(this.platformId)) {
      this.cargarUsuarios();
    }
  }

  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => this.usuarios.set(data), 
      error: (err) => console.error('Error al cargar usuarios:', err)
    });
  }

  // --- 3. ¡NUEVAS FUNCIONES AÑADIDAS! ---

  eliminarUsuario(id: string): void {
    // (Opcional: podrías añadir un check para no borrar tu propio usuario)
    if (confirm('¿Estás seguro de que quieres eliminar a este usuario?')) {
      this.usuarioService.borrarUsuario(id).subscribe({
        next: () => this.cargarUsuarios(), // Recarga la lista
        error: (err) => console.error('Error al eliminar usuario:', err)
      });
    }
  }

  cambiarRol(id: string, rolActual: string): void {
    const nuevoRol = rolActual === 'admin' ? 'estudiante' : 'admin';
    const confirmMsg = `¿Estás seguro de que quieres cambiar el rol de este usuario a "${nuevoRol}"?`;
    
    if (confirm(confirmMsg)) {
      this.usuarioService.actualizarRol(id, nuevoRol).subscribe({
        next: () => this.cargarUsuarios(), // Recarga la lista
        error: (err) => console.error('Error al cambiar rol:', err)
      });
    }
  }
}