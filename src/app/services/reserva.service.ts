import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


interface Reserva {
  id: number;
  description: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private router: Router) { }

  // CENTRO DEPORTIVO 1
  buttons1 : Reserva[] = [
    { id: 1, description: 'Boton 1.1', image: '../../../../assets/centro1.png'},
    { id: 2, description: 'Boton 1.2', image: '../../../../assets/centro1.png'},
    { id: 3, description: 'Boton 1.3', image: '../../../../assets/centro1.png'},
    { id: 4, description: 'Boton 1.4', image: '../../../../assets/centro1.png'},
    { id: 5, description: 'Boton 1.5', image: '../../../../assets/centro1.png'},
    { id: 6, description: 'Boton 1.6', image: '../../../../assets/centro1.png'},
    { id: 7, description: 'Boton 1.7', image: '../../../../assets/centro1.png'},
    { id: 8, description: 'Boton 1.8', image: '../../../../assets/centro1.png'},
    { id: 9, description: 'Boton 1.9', image: '../../../../assets/centro1.png'},
    { id: 10, description: 'Boton 1.10', image: '../../../../assets/centro1.png'},
    { id: 11, description: 'Boton 1.11', image: '../../../../assets/centro1.png'},
    { id: 12, description: 'Boton 1.12', image: '../../../../assets/centro1.png'},
  ];

  // CENTRO DEPORTIVO 2

  buttons2 : Reserva[] = [
    { id: 4, description: 'Boton 2.1', image: '../../../../assets/centro2.png'},
    { id: 5, description: 'Boton 2.2', image: '../../../../assets/centro2.png'},
    { id: 6, description: 'Boton 2.3', image: '../../../../assets/centro2.png'},
  ];

  // WELLNESS CENTER 

  buttons3 : Reserva[] = [
    { id: 7, description: 'Boton 3.1', image: '../../../../assets/wellness.png'},
    { id: 8, description: 'Boton 3.2', image: '../../../../assets/wellness.png'},
    { id: 9, description: 'Boton 3.3', image: '../../../../assets/wellness.png'},
  ];

  
  selectedReservation: Reserva | null = null;

  selectReservation(reservation: Reserva): void {
    this.selectedReservation = reservation;
    this.router.navigate(['/reservaPage'])
  }


}
