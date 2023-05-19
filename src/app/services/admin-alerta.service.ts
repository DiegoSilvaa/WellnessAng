import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminAlertaService {

  selectedReservation: any;

  selectReservation(reservation: any): void {
    this.selectedReservation = reservation;
  }
}

