import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAlertaService } from 'src/app/services/admin-alerta.service';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent {
  API : string = 'http://gymcodersapivm.eastus.cloudapp.azure.com:1433/avisos/administrador';
  notificaciones: any;
  notificacionesArray: any;
  private refreshInterval!: Subscription;

  constructor(private router: Router, private alertaService: AdminAlertaService,private http: HttpClient) { 
    this.notificaciones = [];
  }

  ngOnInit() {
    this.getAlertas();
  }

  getAlertas() {
    this.http.get<any[]>(this.API).subscribe((results: any) => {
      this.notificaciones = Object.values(results.data);
      console.log(this.notificaciones)
      this.notificacionesArray = Array.isArray(this.notificaciones) ? this.notificaciones : [this.notificaciones];
      this.notificacionesArray.forEach((reserva: any) => {
        const fecha = new Date(reserva.fecha_fin);
        const formattedFecha = fecha.toISOString().slice(0, 10);
        const fecha2 = new Date(reserva.fecha_inicio);
        const formattedFecha2 = fecha2.toISOString().slice(0, 10);

        reserva.fecha_fin = formattedFecha;
        reserva.fecha_inicio = formattedFecha2;
      });
    });
  }

  ngOnDestroy() {
    if (this.refreshInterval) {
      this.refreshInterval.unsubscribe();
    }
  }

  crearAviso() {
    this.router.navigate(['/crearAviso']);
  }

  editarAviso(not: any) : void {
    this.alertaService.selectReservation(not)
    this.router.navigate(['/editarAviso']);
  }
  
  confirmarEliminacion(reservation: any) {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este elemento?');
    if (confirmacion) {
      // Lógica para eliminar el elemento
      this.eliminarAviso(reservation);
    } else {
      alert('No se elimino el aviso, ya que cancelaste la confirmacion')
    }
  }

  eliminarAviso (not: any) {
    this.http.delete(`http://gymcodersapivm.eastus.cloudapp.azure.com:1433/avisos/${not.id_aviso}`).subscribe(
      () => {
        console.log('Elemento eliminado exitosamente');
        alert('Alerta eliminada con exito')
      },
      error => {
        console.error('Error al eliminar el elemento', error);
      }
    );
  }

}