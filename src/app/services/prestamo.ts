// src/app/services/prestamo.ts
import { Injectable, inject, PLATFORM_ID } from '@angular/core'; // <-- Importa PLATFORM_ID
import { isPlatformBrowser } from '@angular/common'; // <-- Importa isPlatformBrowser
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// ¡YA NO IMPORTAMOS AUTHSERVICE!

@Injectable({
  providedIn: 'root'
})
export class PrestamoService { // Ojo si tu clase se llama 'Prestamo'

  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID); // <-- Inyectamos esto

  private readonly apiUrl = 'https://biblioteca-backend-la4y.onrender.com/api/prestamos';

  // Función helper "BLINDADA"
  private getAuthHeaders(): HttpHeaders | undefined {
    // 1. Si estamos en el Servidor (SSR), no hay token.
    if (!isPlatformBrowser(this.platformId)) {
      return undefined; 
    }
    
    // 2. Si estamos en el Navegador, leemos localStorage.
    const token = localStorage.getItem('token');
    if (!token) {
      return undefined;
    }
    
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // --- Funciones de Admin ---
  getTodosLosPrestamos(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  crearPrestamo(datosPrestamo: { libroId: string, usuarioId: string }): Observable<any> {
    return this.http.post(this.apiUrl, datosPrestamo, { headers: this.getAuthHeaders() });
  }

  devolverPrestamo(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/devolver`, {}, { headers: this.getAuthHeaders() });
  }

  // --- Funciones de Estudiante ---
  getMisPrestamos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/mis-prestamos`, { headers: this.getAuthHeaders() });
  }
}