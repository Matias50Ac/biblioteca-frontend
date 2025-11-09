// src/app/services/usuario.ts
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService { 

  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID); 

  private readonly apiUrl = 'https://biblioteca-backend-la4y.onrender.com/api/usuarios';

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

  // GET /api/usuarios (Ver TODOS los usuarios)
  getUsuarios(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  // --- ¡NUEVO CÓDIGO AÑADIDO! ---

  // DELETE /api/usuarios/:id
  borrarUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  // PUT /api/usuarios/:id
  actualizarRol(id: string, nuevoRol: string): Observable<any> {
    const body = { rol: nuevoRol };
    return this.http.put(`${this.apiUrl}/${id}`, body, { headers: this.getAuthHeaders() });
  }
}