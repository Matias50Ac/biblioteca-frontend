// src/app/Vistas/admin/admin-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// 1. Importamos los CUATRO componentes
import { Dashboard } from './dashboard/dashboard'; 
import { GestionLibros } from './gestion-de-libros/gestion-libros';
import { GestionPrestamos } from './gestion-prestamos/gestion-prestamos';
import { GestionUsuarios } from './gestion-usuarios/gestion-usuarios'; // <-- AÑADE ESTA LÍNEA

// 2. Definimos las CUATRO rutas
const routes: Routes = [
  {
    path: '', // Ruta por defecto (/admin)
    component: Dashboard
  },
  {
    path: 'libros', // Ruta de libros (/admin/libros)
    component: GestionLibros 
  },
  {
    path: 'prestamos', // La ruta /admin/prestamos
    component: GestionPrestamos
  },
  {
    path: 'usuarios', // La ruta /admin/usuarios
    component: GestionUsuarios // <-- AÑADE ESTE OBJETO
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }