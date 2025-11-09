// src/app/Vistas/student/student-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// 1. Importamos los TRES componentes
import { Dashboard } from './dashboard/dashboard'; 
import { CatalogoLibros } from './catalogo-libros/catalogo-libros';
import { MisPrestamos } from './mis-prestamos/mis-prestamos'; // <-- AÑADE ESTA LÍNEA

// 2. Definimos las TRES rutas
const routes: Routes = [
  {
    path: '', // Ruta por defecto (/student)
    component: Dashboard
  },
  {
    path: 'catalogo', // La ruta /student/catalogo
    component: CatalogoLibros
  },
  {
    path: 'mis-prestamos', // La ruta /student/mis-prestamos
    component: MisPrestamos // <-- AÑADE ESTE OBJETO
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }