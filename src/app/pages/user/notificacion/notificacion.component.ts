import { Component, OnInit } from '@angular/core';
import { NotService } from 'src/app/services/not.service';
import { Router } from '@angular/router';

interface Reservation {
  id: number;
  cancha: string;
  fecha: string;
}

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent {

  constructor(private notServie: NotService, private router: Router) { }

  
  reservations = this.notServie.reservations;

  onReservationClick(reservation: Reservation): void {
    this.notServie.selectReservation(reservation);
    this.router.navigate(['/notificacionConf']);
  }
}
