// src/app/services/auth.ts
import { Injectable, inject, signal, PLATFORM_ID } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common'; // <-- Importante

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID); // <-- Para saber dónde estamos

  private readonly apiUrl = 'https://biblioteca-backend-la4y.onrender.com/api/auth';

  // 1. Inicializa la señal como null SIEMPRE.
  currentUser = signal<any | null>(null);

  constructor() {
    // 2. SOLO si estamos en el navegador, intentamos leer el token.
    if (isPlatformBrowser(this.platformId)) {
      const decodedToken = this.getDecodedToken();
      this.currentUser.set(decodedToken);
    }
  }

  login(credenciales: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credenciales).pipe(
      tap((respuesta: any) => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', respuesta.token);
        }
        const decodedToken = this.decodeToken(respuesta.token);
        this.currentUser.set(decodedToken);
      })
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
    this.currentUser.set(null);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  // --- Funciones Helper ---
  private decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Error decodificando el token", error);
      return null;
    }
  }

  private getDecodedToken(): any {
    const token = this.getToken(); // Esta función ahora es segura
    if (token) {
      return this.decodeToken(token);
    }
    return null;
  }
}