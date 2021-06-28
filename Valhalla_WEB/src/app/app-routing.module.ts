import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PropuestasComponent } from './components/propuestas/propuestas.component';
import { PublicacionesComponent } from './components/publicaciones/publicaciones.component';
import { ReportesComponent } from './components/reportes/reportes.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'propuesta', component: PropuestasComponent },
  { path: 'pefil', component: PerfilComponent },
  { path: 'publicaciones', component: PublicacionesComponent },
  { path: 'reportes', component: ReportesComponent }
];


export const AppRoutingModule = RouterModule.forRoot(routes);
