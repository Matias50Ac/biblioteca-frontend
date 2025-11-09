// src/app/app.routes.ts
import { Routes } from '@angular/router';

// 1. IMPORTAMOS LOS GUARDIAS (con .guard)
import { adminGuard } from './security/admin-guard';
import { studentGuard } from './security/student-guard';

// 2. IMPORTAMOS EL LOGIN (con el nombre corto 'Login')
import { Login } from './Vistas/login/login'; 

export const routes: Routes = [
  
  {
    path: 'login',
    component: Login
  },

  // --- RUTA ADMIN ---
  {
    path: 'admin',
    canActivate: [adminGuard], // <-- Ahora sí lo encuentra
    loadChildren: () => 
        // 3. IMPORTAMOS EL MÓDULO (con .module)
        import('./Vistas/admin/admin-module')
        .then(m => m.AdminModule)
  },

  // --- RUTA STUDENT ---
  {
    path: 'student',
    canActivate: [studentGuard], // <-- Ahora sí lo encuentra
    loadChildren: () => 
        // 3. IMPORTAMOS EL MÓDULO (con .module)
        import('./Vistas/student/student-module')
        .then(m => m.StudentModule)
  },

  // --- RUTAS POR DEFECTO ---
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];