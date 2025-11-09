// src/app/security/admin-guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// FÍJATE: Exportamos 'adminGuard', no 'AuthService'
export const adminGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID); 

  // 1. Si estamos en el SERVIDOR (SSR), dejamos pasar.
  if (!isPlatformBrowser(platformId)) {
    return true; 
  }

  // 2. Si estamos en el NAVEGADOR, leemos localStorage DIRECTAMENTE.
  const token = localStorage.getItem('token');
  
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  // 3. Revisamos si el token es válido Y si es admin
  try {
    const user: any = jwtDecode(token); 
    
    if (user.rol === 'admin') {
      return true; // <-- ¡Permiso!
    } else {
      router.navigate(['/student']); 
      return false;
    }
  } catch (e) {
    // Token vencido o corrupto
    localStorage.removeItem('token');
    router.navigate(['/login']);
    return false;
  }
};