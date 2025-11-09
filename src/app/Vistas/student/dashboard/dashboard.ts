import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router'; // <-- 1. Importamos Router y RouterLink
import { AuthService } from '../../../services/auth'; // <-- 2. Importamos el AuthService

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink // <-- 3. Añadimos RouterLink a los imports (para los <a>)
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard { // Ojo si tu clase se llama DashboardComponent

  // 4. Inyectamos los servicios
  private authService = inject(AuthService);
  private router = inject(Router);

  // 5. Añadimos la función de logout
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirige al login
  }
}