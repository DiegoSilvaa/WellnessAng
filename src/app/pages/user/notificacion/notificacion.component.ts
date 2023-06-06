import { Component, OnInit } from '@angular/core';
import { NotService } from 'src/app/services/not.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent implements OnInit {
  API : string = 'http://gymcodersapivm.eastus.cloudapp.azure.com:1433/avisos/alumno';
  notificaciones: any;
  notificacionesArray: any;
  private refreshInterval!: Subscription;

  constructor(private notServie: NotService, private router: Router,private http: HttpClient) { 
    this.notificaciones = [];
  }

  ngOnInit() {
    
    this.getNoti();
    this.refreshInterval = interval(10000).subscribe(() => {
      this.getNoti();
    });
  }

  getNoti() {
    this.http.get<any[]>(this.API).subscribe((results: any) => {
      this.notificaciones = Object.values(results.data);
      console.log(this.notificaciones)
      this.notificacionesArray = Array.isArray(this.notificaciones) ? this.notificaciones : [this.notificaciones];
      // Convertir la fecha a formato "aa-mm-dd"
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
  
  onReservationClick(reservation: any): void {
    const reservationArray = Array.isArray(reservation) ? reservation : [reservation];
    this.notServie.selectReservation(reservationArray);
    this.router.navigate(['/notificacionConf']);
  }
}
