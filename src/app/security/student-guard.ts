// src/app/security/student-guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// FÍJATE: Exportamos 'studentGuard'
export const studentGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // 1. Si estamos en el SERVIDOR (SSR), dejamos pasar.
  if (!isPlatformBrowser(platformId)) {
    return true; 
  }

  // 2. Si estamos en el NAVEGADOR, leemos localStorage
  const token = localStorage.getItem('token');
  
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  // 3. Revisamos si el token es válido (no importa el rol)
  try {
    const user: any = jwtDecode(token); 
    
    if (user) {
      return true; // <-- ¡Permiso!
    } else {
      router.navigate(['/login']);
      return false;
    }
  } catch (e) {
    // Token vencido o corrupto
    localStorage.removeItem('token');
    router.navigate(['/login']);
    return false;
  }
};