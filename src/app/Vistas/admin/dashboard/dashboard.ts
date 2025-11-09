import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router'; // <-- ¡Asegúrate de importar RouterLink!
import { AuthService } from '../../../services/auth'; 

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink // <-- ¡Asegúrate de que RouterLink esté en los imports!
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  private authService = inject(AuthService);
  private router = inject(Router);

  logout(): void {
    this.authService.logout(); 
    this.router.navigate(['/login']); 
  }
}