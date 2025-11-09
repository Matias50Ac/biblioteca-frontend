import { Component, inject } from '@angular/core';
import { Router } from '@angular/router'; // Para redirigir al usuario
import { AuthService } from '../../services/auth'; // Tu servicio de auth
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Para el formulario
import { CommonModule } from '@angular/common'; // Para usar *ngIf, etc.

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule, // Para [formGroup] y formControlName
    CommonModule         // Para *ngIf
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  // Inyectamos las herramientas que necesitamos
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Creamos el "molde" del formulario
  loginForm: FormGroup;
  
  // Mensaje de error (si las credenciales son inválidas)
  errorMessage: string | null = null;

  constructor() {
    // Definimos el formulario al iniciar el componente
    this.loginForm = this.fb.group({
      // Requisito: Formularios Reactivos con Validaciones
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Esta función se llama cuando el formulario se envía
  onSubmit() {
    // Si el formulario es inválido (ej: email vacío), no hacemos nada
    if (this.loginForm.invalid) {
      return;
    }

    // Si es válido, llamamos al servicio de login
    this.authService.login(this.loginForm.value).subscribe({
      next: (respuesta) => {
        // ¡Éxito!
        console.log('Login exitoso', respuesta);
        
        // Leemos el rol del usuario que está en la señal del servicio
        const userRole = this.authService.currentUser()?.rol;
        
        // Redirigimos según el rol
        if (userRole === 'admin') {
          this.router.navigate(['/admin']); // Al dashboard de admin
        } else {
          this.router.navigate(['/student']); // Al dashboard de estudiante
        }
      },
      error: (err) => {
        // ¡Error!
        // Requisito: Mostrar mensajes de error apropiados
        this.errorMessage = 'Credenciales inválidas. Por favor, inténtalo de nuevo.';
        console.error('Error en el login', err);
      }
    });
  }
}