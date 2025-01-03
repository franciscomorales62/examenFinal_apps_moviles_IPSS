import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'lista-tareas',
    loadComponent: () => import('./lista-tareas/lista-tareas.page').then( m => m.ListaTareasPage)
  },
  {
    path: 'listar-tareas',
    loadComponent: () => import('./listar-tareas/listar-tareas.page').then( m => m.ListarTareasPage)
  },
  {
    path: 'editar-tarea/:id',
    loadComponent: () => import('./editar-tarea/editar-tarea.page').then( m => m.EditarTareaPage)
  },
  {
    path: 'registro-usuario',
    loadComponent: () => import('./registro-usuario/registro-usuario.page').then( m => m.RegistroUsuarioPage)
  },
];
