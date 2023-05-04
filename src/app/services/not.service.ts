import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class NotService {

  selectedReservation: any;

  selectReservation(reservation: any): void {
    this.selectedReservation = reservation;
  }
}
