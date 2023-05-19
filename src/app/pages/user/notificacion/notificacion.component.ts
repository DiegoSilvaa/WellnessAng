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
  API : string = 'http://gymcodersapivm.eastus.cloudapp.azure.com:1433/avisos';
  notificaciones: any;
  notificacionesArray: any;
  private refreshInterval!: Subscription;

  constructor(private notServie: NotService, private router: Router,private http: HttpClient) { 
    this.notificaciones = [];
  }

  ngOnInit() {
    this.http.get<any[]>(this.API).subscribe((results: any) => {
      this.notificaciones = Object.values(results.data);
      console.log(this.notificaciones)
      this.notificacionesArray = Array.isArray(this.notificaciones) ? this.notificaciones : [this.notificaciones];
    });

    this.refreshInterval = interval(10000).subscribe(() => {
      this.http.get<any[]>(this.API).subscribe((results: any) => {
        this.notificaciones = Object.values(results.data);
        console.log(this.notificaciones)
        this.notificacionesArray = Array.isArray(this.notificaciones) ? this.notificaciones : [this.notificaciones];
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
