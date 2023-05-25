import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

// Routeo
import { AppRoutingModule } from './app-routing/app-routing.module';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';

 // Usuario Page

import { PerfilComponent } from './pages/user/perfil/perfil.component';
import { ReservasComponent } from './pages/user/reservas/reservas.component';
import { ReservaPageComponent } from './pages/user/reserva-page/reserva-page.component';
import { NotificacionComponent } from './pages/user/notificacion/notificacion.component';
import { NotificacionConfComponent } from './pages/user/notificacion-conf/notificacion-conf.component';
import { ReservaPageConfComponent } from './pages/user/reserva-page-conf/reserva-page-conf.component';
import { HomeComponent } from './pages/user/home/home.component';

// Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatChipsModule} from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

// Services
import { AuthServiceService } from './services/auth-service.service';
import { AuthGuard } from './services/can-activate.service';
import { ReservaService } from './services/reserva.service';
import { NotService } from './services/not.service';

import { SideBarAdminComponent } from './components/side-bar-admin/side-bar-admin.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { NewAforoComponent } from './pages/admin/new-aforo/new-aforo.component';
import { AlertasComponent } from './pages/admin/alertas/alertas.component';
import { NewreservacionesComponent } from './pages/admin/newreservaciones/newreservaciones.component';
import { RegistroModuloComponent } from './pages/register/registro-modulo/registro-modulo.component';
import { SidebarRegisterComponent } from './components/sidebar-register/sidebar-register.component';
import { ErrorComponent } from './components/error/error.component';
import { AppRatingComponent } from './components/app-rating/app-rating.component';

import { CrearAvisoComponent } from './components/crear-aviso/crear-aviso.component';
import { EditarAvisoComponent } from './components/editar-aviso/editar-aviso.component';
import { RangeCalendarComponent } from './components/range-calendar/range-calendar.component';
import { SpinnerAforoComponent } from './components/spinner-aforo/spinner-aforo.component';
import { ReservasDisplayComponent } from './pages/admin/reservas-display/reservas-display.component';
import { GraficasAdminComponent } from './pages/admin/graficas-admin/graficas-admin.component';
import { StatsAforoComponent } from './pages/admin/stats-aforo/stats-aforo.component';
import { InstalacionesDisplayComponent } from './pages/user/instalaciones-display/instalaciones-display.component';
import { NewCentroComponent } from './pages/admin/new-centro/new-centro.component';
import { EditarCentroComponent } from './pages/admin/editar-centro/editar-centro.component';
import { EditarInstalacionComponent } from './pages/admin/editar-instalacion/editar-instalacion.component';
import { ModalComponent } from './pages/admin/new-aforo/new-aforo.component';
import { ModalComponentEdit } from './pages/admin/new-aforo/new-aforo.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ModalComponentEdit,
    HomeComponent,
    SidebarComponent,
    PerfilComponent,
    ReservasComponent,
    ReservaPageComponent,
    NotificacionComponent,
    NotificacionConfComponent,
    ReservaPageConfComponent,
    NavbarComponent,
    SideBarAdminComponent,
    DashboardComponent,
    NewAforoComponent,
    AlertasComponent,
    NewreservacionesComponent,
    RegistroModuloComponent,
    SidebarRegisterComponent,
    ErrorComponent,
    AppRatingComponent,
    CrearAvisoComponent,
    EditarAvisoComponent,
    RangeCalendarComponent,
    SpinnerAforoComponent,
    ReservasDisplayComponent,
    GraficasAdminComponent,
    StatsAforoComponent,
    InstalacionesDisplayComponent,
    NewCentroComponent,
    EditarCentroComponent,
    EditarInstalacionComponent,
    ModalComponent
  ],
  imports: [
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserModule,
    AppRoutingModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatTabsModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatGridListModule,
    MatButtonModule,
    MatToolbarModule,
    CalendarModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    MatDialogModule,
    HttpClientModule,
    MatSortModule,
    MatCheckboxModule,
    MatOptionModule,
    MatSelectModule,
    MatDividerModule,
  ],
  providers: [
    AuthServiceService, 
    AuthGuard, 
    ReservaService,
    NotService],
  bootstrap: [AppComponent]
})
export class AppModule { }
