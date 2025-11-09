// src/app/Vistas/student/student.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing-module';

// ¡LOS COMPONENTES STANDALONE SE IMPORTAN COMO MÓDULOS!
import { Dashboard } from './dashboard/dashboard';
import { CatalogoLibros } from './catalogo-libros/catalogo-libros';
import { MisPrestamos } from './mis-prestamos/mis-prestamos'; // <-- AÑADE ESTA LÍNEA

@NgModule({
  
  declarations: [],
  
  imports: [
    CommonModule,
    StudentRoutingModule,
    
    // Aquí importamos los componentes
    Dashboard,
    CatalogoLibros,
    MisPrestamos
  ]
})
export class StudentModule { }