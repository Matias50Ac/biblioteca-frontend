// src/app/services/libro.ts
import { Injectable, inject, PLATFORM_ID } from '@angular/core'; // <-- Importa PLATFORM_ID
import { isPlatformBrowser } from '@angular/common'; // <-- Importa isPlatformBrowser
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// ¡YA NO IMPORTAMOS AUTHSERVICE!

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID); // <-- Inyectamos esto

  private readonly apiUrl = 'https://biblioteca-backend-b4yv.onrender.com/api/libros';

  // --- Función PÚBLICA (No necesita token) ---
  getLibros(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // --- Funciones PRIVADAS (Admin) ---
  
  // Función helper "BLINDADA"
  private getAuthHeaders(): HttpHeaders | undefined {
    if (!isPlatformBrowser(this.platformId)) {
      return undefined;
    }
    const token = localStorage.getItem('token');
    if (!token) {
      return undefined;
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  crearLibro(libro: any): Observable<any> {
    return this.http.post(this.apiUrl, libro, { headers: this.getAuthHeaders() });
  }

  actualizarLibro(id: string, libro: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, libro, { headers: this.getAuthHeaders() });
  }

  borrarLibro(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}