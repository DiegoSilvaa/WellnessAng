import { Injectable } from '@angular/core';
import { Notificacion } from '../clases/notificacion';

@Injectable({
  providedIn: 'root'
})
export class AdminAlertaService {

  selectedReservation: any;

  selectReservation(reservation: any): void {
    this.selectedReservation = reservation;
  }
}

