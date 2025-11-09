// src/app/Vistas/admin/admin.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing-module';

// ¡LOS COMPONENTES STANDALONE SE IMPORTAN COMO MÓDULOS!
import { Dashboard } from './dashboard/dashboard';
import { GestionLibros } from './gestion-de-libros/gestion-libros';
import { GestionPrestamos } from './gestion-prestamos/gestion-prestamos';
import { GestionUsuarios } from './gestion-usuarios/gestion-usuarios'; // <-- AÑADE ESTA LÍNEA

@NgModule({
  
  declarations: [],
  
  imports: [
    CommonModule,
    AdminRoutingModule,
    
    // Aquí importamos los componentes
    Dashboard,
    GestionLibros,
    GestionPrestamos,
    GestionUsuarios // <-- AÑADE ESTA LÍNEA
  ]
})
export class AdminModule { }