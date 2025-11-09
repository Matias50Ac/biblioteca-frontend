import { Component, inject, OnInit, signal, computed, PLATFORM_ID } from '@angular/core'; // <-- 1. Añadido PLATFORM_ID
import { CommonModule, isPlatformBrowser } from '@angular/common'; // <-- 2. Añadido isPlatformBrowser
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PrestamoService } from '../../../services/prestamo';
import { UsuarioService } from '../../../services/usuario';
import { LibroService } from '../../../services/libro';
import { RouterLink } from '@angular/router'; // <-- 1. IMPORTA ESTO

@Component({
  selector: 'app-gestion-prestamos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink // <-- 2. AÑADE ESTO AQUÍ
  ],
  templateUrl: './gestion-prestamos.html',
  styleUrl: './gestion-prestamos.css'
})
export class GestionPrestamos implements OnInit {

  // --- Inyectamos TODO ---
  private prestamoService = inject(PrestamoService);
  private usuarioService = inject(UsuarioService);
  private libroService = inject(LibroService);
  private fb = inject(FormBuilder);
  private platformId = inject(PLATFORM_ID); // <-- 3. Inyectado PLATFORM_ID

  // --- Señales ---
  prestamos = signal<any[]>([]);
  usuarios = signal<any[]>([]);
  libros = signal<any[]>([]);

  // --- Formulario ---
  prestamoForm: FormGroup;

  librosDisponibles = computed(() => this.libros().filter(libro => libro.disponible));

  constructor() {
    this.prestamoForm = this.fb.group({
      usuarioId: ['', Validators.required],
      libroId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // --- 4. LA SOLUCIÓN ---
    // ¡SOLO carga datos si estás en el NAVEGADOR!
    if (isPlatformBrowser(this.platformId)) {
      this.cargarTodo();
    }
  }

  // Función para cargar préstamos, usuarios y libros al iniciar
  cargarTodo(): void {
    // 1. Cargar Préstamos
    this.prestamoService.getTodosLosPrestamos().subscribe({
      next: (data) => this.prestamos.set(data),
      error: (err) => console.error('Error al cargar préstamos:', err)
    });

    // 2. Cargar Usuarios (para el <select>)
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => this.usuarios.set(data),
      error: (err) => console.error('Error al cargar usuarios:', err)
    });

    // 3. Cargar Libros (para el <select>)
    this.libroService.getLibros().subscribe({
      next: (data) => this.libros.set(data),
      error: (err) => console.error('Error al cargar libros:', err)
    });
  }

  // --- Función para CREAR un préstamo ---
  onSubmitPrestamo(): void {
    if (this.prestamoForm.invalid) {
      return;
    }

    const datos = {
      usuarioId: this.prestamoForm.value.usuarioId,
      libroId: this.prestamoForm.value.libroId
    };

    this.prestamoService.crearPrestamo(datos).subscribe({
      next: () => {
        this.cargarTodo(); 
        this.prestamoForm.reset(); 
      },
      error: (err) => console.error('Error al crear préstamo:', err)
    });
  }

  // --- Función para DEVOLVER un libro ---
  devolverLibro(id: string): void {
    if (confirm('¿Confirmar la devolución de este libro?')) {
      this.prestamoService.devolverPrestamo(id).subscribe({
        next: () => {
          this.cargarTodo(); 
        },
        error: (err) => console.error('Error al devolver:', err)
      });
    }
  }
}