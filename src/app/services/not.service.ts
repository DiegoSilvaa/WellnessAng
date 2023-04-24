import { Injectable } from '@angular/core';

interface Reservation {
  id: number;
  cancha: string;
  fecha: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotService {
  reservations: Reservation[] = [
    { id: 1, cancha: 'Cancha 1', fecha: '2023-05-01' },
    { id: 2, cancha: 'Cancha 2', fecha: '2023-05-02' },
    { id: 3, cancha: 'Cancha 3', fecha: '2023-05-03' },
    { id: 4, cancha: 'Cancha 4', fecha: '2023-05-04' },
    { id: 5, cancha: 'Cancha 5', fecha: '2023-05-05' },
    { id: 6, cancha: 'Cancha 6', fecha: '2023-05-06' },
    { id: 7, cancha: 'Cancha 7', fecha: '2023-05-07' },
    { id: 8, cancha: 'Cancha 8', fecha: '2023-05-08' },
    { id: 9, cancha: 'Cancha 9', fecha: '2023-05-09' },
    { id: 10, cancha: 'Cancha 10', fecha: '2023-05-10' }
  ];
  
  selectedReservation: Reservation | null = null;

  selectReservation(reservation: Reservation): void {
    this.selectedReservation = reservation;
  }


}
