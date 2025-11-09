import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Para *ngFor y | date
import { PrestamoService } from '../../../services/prestamo'; // Tu servicio
import { RouterLink } from '@angular/router'; // <-- 1. IMPORTA ESTO

@Component({
  selector: 'app-mis-prestamos',
  standalone: true,
  imports: [
    CommonModule, // <-- ¡Importante para la tabla!
    RouterLink // <-- 2. AÑADE ESTO AQUÍ
  ],
  templateUrl: './mis-prestamos.html',
  styleUrl: './mis-prestamos.css'
})
export class MisPrestamos implements OnInit { // Ojo si tu clase se llama MisPrestamosComponent

  // Inyectamos el servicio
  private prestamoService = inject(PrestamoService);

  // Señal para la lista de *mis* préstamos
  misPrestamos = signal<any[]>([]);

  constructor() { }

  ngOnInit(): void {
    this.cargarMisPrestamos();
  }

  // Carga solo los préstamos del usuario logueado
  cargarMisPrestamos(): void {
    // Usamos la función específica del servicio
    this.prestamoService.getMisPrestamos().subscribe({
      next: (data) => {
        // El backend ya filtró y nos da solo nuestros préstamos
        this.misPrestamos.set(data); 
      },
      error: (err) => {
        console.error('Error al cargar mis préstamos:', err);
        // (Aquí podríamos mostrar un error si el token es inválido)
      }
    });
  }
}