import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../pages/user/home/home.component';
import { PerfilComponent } from '../pages/user/perfil/perfil.component';
import { ReservasComponent } from '../pages/user/reservas/reservas.component';
import { ReservaPageComponent } from '../pages/user/reserva-page/reserva-page.component';
import { ReservaPageConfComponent } from '../pages/user/reserva-page-conf/reserva-page-conf.component';
import { NotificacionComponent } from '../pages/user/notificacion/notificacion.component';
import { NotificacionConfComponent } from '../pages/user/notificacion-conf/notificacion-conf.component';

// Admin 
import { AlertasComponent } from '../pages/admin/alertas/alertas.component';
import { DashboardComponent } from '../pages/admin/dashboard/dashboard.component';
import { NewAforoComponent } from '../pages/admin/new-aforo/new-aforo.component';
import { NewreservacionesComponent } from '../pages/admin/newreservaciones/newreservaciones.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'reservas', component: ReservasComponent },
  { path: 'reservaPage', component: ReservaPageComponent},
  { path: 'reservaConf', component: ReservaPageConfComponent},
  { path: 'notificacion', component: NotificacionComponent},
  { path: 'notificacionConf', component: NotificacionConfComponent},
  
  { path: 'alertas', component: AlertasComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'aforo', component: NewAforoComponent},
  { path: 'newReservas', component: NewreservacionesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

