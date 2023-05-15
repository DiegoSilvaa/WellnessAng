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
import { InstalacionesDisplayComponent } from '../pages/user/instalaciones-display/instalaciones-display.component';
// Admin 
import { AlertasComponent } from '../pages/admin/alertas/alertas.component';
import { DashboardComponent } from '../pages/admin/dashboard/dashboard.component';
import { NewAforoComponent } from '../pages/admin/new-aforo/new-aforo.component';
import { NewreservacionesComponent } from '../pages/admin/newreservaciones/newreservaciones.component';
import { CrearAvisoComponent } from '../components/crear-aviso/crear-aviso.component';
import { EditarAvisoComponent } from '../components/editar-aviso/editar-aviso.component';
import { ReservasDisplayComponent } from '../pages/admin/reservas-display/reservas-display.component';
import { GraficasAdminComponent } from '../pages/admin/graficas-admin/graficas-admin.component';
import { StatsAforoComponent } from '../pages/admin/stats-aforo/stats-aforo.component';
// Registro Modulo

import { RegistroModuloComponent } from '../pages/register/registro-modulo/registro-modulo.component';

// Services

import { AuthGuard } from '../services/can-activate.service';

// Error
import { ErrorComponent } from '../components/error/error.component';

const routes: Routes = [
  { path: '', component: LoginComponent, },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: 'reservas', component: ReservasComponent,  canActivate: [AuthGuard] },
  { path: 'reservaPage', component: ReservaPageComponent,  canActivate: [AuthGuard]},
  { path: 'reservaConf', component: ReservaPageConfComponent,  canActivate: [AuthGuard]},
  { path: 'notificacion', component: NotificacionComponent,  canActivate: [AuthGuard]},
  { path: 'notificacionConf', component: NotificacionConfComponent,  canActivate: [AuthGuard]},
  { path: 'alertas', component: AlertasComponent,  canActivate: [AuthGuard]},
  { path: 'dashboard', component: DashboardComponent,  canActivate: [AuthGuard]},
  { path: 'aforo', component: NewAforoComponent,  canActivate: [AuthGuard]},
  { path: 'newReservas', component: NewreservacionesComponent,  canActivate: [AuthGuard]},
  { path: 'registroModulo', component: RegistroModuloComponent,  canActivate: [AuthGuard]},
  { path: 'crearAviso', component: CrearAvisoComponent,  canActivate: [AuthGuard]},
  { path: 'editarAviso', component: EditarAvisoComponent,  canActivate: [AuthGuard]},
  { path: 'dispReserva', component: ReservasDisplayComponent,  canActivate: [AuthGuard]},
  { path: 'graficasAdmin', component: GraficasAdminComponent, canActivate: [AuthGuard] },
  { path: 'statsAdmin', component: StatsAforoComponent, canActivate: [AuthGuard] },
  { path: 'instalacionesUser', component: InstalacionesDisplayComponent, canActivate: [AuthGuard] },
  { path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

