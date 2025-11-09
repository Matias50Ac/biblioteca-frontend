import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Para *ngFor, *ngIf
import { LibroService } from '../../../services/libro'; // Tu servicio
import { RouterLink } from '@angular/router'; // <-- 1. IMPORTA ESTO

@Component({
  selector: 'app-gestion-libros',
  standalone: true, // <-- ASEGÚRATE DE QUE ESTÉ
  imports: [
    CommonModule,
    ReactiveFormsModule, // <-- ASEGÚRATE DE QUE ESTÉ
    RouterLink // <-- 2. AÑADE ESTO AQUÍ
  ],
  templateUrl: './gestion-libros.html',
  styleUrls: ['./gestion-libros.css'],
})
export class GestionLibros { // Ojo si tu clase se llama GestionLibrosComponent

  // Inyectamos los servicios y herramientas
  private libroService = inject(LibroService);
  private fb = inject(FormBuilder);

  // --- Señales (Signals) para manejar el estado ---
  // Requisito del proyecto: Usar Signals
  libros = signal<any[]>([]); // Señal para la lista de libros
  modoEdicion = signal(false); // Señal para saber si estamos editando
  libroIdActual = signal<string | null>(null); // Señal para guardar el ID del libro a editar

  // --- Formulario Reactivo ---
  libroForm: FormGroup;

  constructor() {
    // Definimos el formulario con sus validaciones
    this.libroForm = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      isbn: ['', Validators.required]
    });
  }

  // ngOnInit se ejecuta cuando el componente carga
  ngOnInit(): void {
    this.cargarLibros();
  }

  // Carga la lista de libros desde el servicio
  cargarLibros(): void {
    this.libroService.getLibros().subscribe({
      next: (data) => {
        this.libros.set(data); // Actualizamos la señal con los datos
      },
      error: (err) => console.error('Error al cargar libros:', err)
    });
  }

  // Se llama al enviar el formulario (botón Guardar)
  onSubmit(): void {
    if (this.libroForm.invalid) {
      return; // Si el formulario es inválido, no hacemos nada
    }

    const libroData = this.libroForm.value;

    if (this.modoEdicion()) {
      // --- MODO EDICIÓN ---
      const id = this.libroIdActual();
      if (id) {
        this.libroService.actualizarLibro(id, libroData).subscribe({
          next: () => {
            this.resetearFormulario();
            this.cargarLibros(); // Recargamos la lista
          },
          error: (err) => console.error('Error al actualizar:', err)
        });
      }
    } else {
      // --- MODO CREACIÓN ---
      this.libroService.crearLibro(libroData).subscribe({
        next: () => {
          this.resetearFormulario();
          this.cargarLibros(); // Recargamos la lista
        },
        error: (err) => console.error('Error al crear:', err)
      });
    }
  }

  // Prepara el formulario para editar un libro
  editarLibro(libro: any): void {
    this.modoEdicion.set(true); // Activamos modo edición
    this.libroIdActual.set(libro._id); // Guardamos el ID
    
    // Llenamos el formulario con los datos del libro
    this.libroForm.patchValue({
      titulo: libro.titulo,
      autor: libro.autor,
      isbn: libro.isbn
    });
  }

  // Borra un libro
  borrarLibro(id: string): void {
    if (confirm('¿Estás seguro de que quieres borrar este libro?')) {
      this.libroService.borrarLibro(id).subscribe({
        next: () => {
          this.cargarLibros(); // Recargamos la lista
        },
        error: (err) => console.error('Error al borrar:', err)
      });
    }
  }

  // Limpia el formulario y sale del modo edición
  resetearFormulario(): void {
    this.libroForm.reset();
    this.modoEdicion.set(false);
    this.libroIdActual.set(null);
  }
}