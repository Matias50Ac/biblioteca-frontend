import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngFor
import { LibroService } from '../../../services/libro'; // El servicio que ya existe
import { RouterLink } from '@angular/router'; // <-- 1. IMPORTA ESTO

@Component({
  selector: 'app-catalogo-libros',
  standalone: true,
  imports: [
    CommonModule, // <-- ¡Importante para *ngFor!
    RouterLink // <-- 2. AÑADE ESTO AQUÍ
  ],
  templateUrl: './catalogo-libros.html',
  styleUrl: './catalogo-libros.css'
})
export class CatalogoLibros implements OnInit { // Ojo si tu clase se llama CatalogoLibrosComponent

  private libroService = inject(LibroService);

  // Señal para la lista de libros
  libros = signal<any[]>([]);

  constructor() { }

  ngOnInit(): void {
    this.cargarLibros();
  }

  // Carga la lista de TODOS los libros
  cargarLibros(): void {
    this.libroService.getLibros().subscribe({
      next: (data) => {
        this.libros.set(data); 
      },
      error: (err) => console.error('Error al cargar libros:', err)
    });
  }
}