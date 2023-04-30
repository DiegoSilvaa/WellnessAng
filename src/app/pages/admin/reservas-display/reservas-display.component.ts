import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Reserva {
  id: number;
  description: string;
  image: string;
}


@Component({
  selector: 'app-reservas-display',
  templateUrl: './reservas-display.component.html',
  styleUrls: ['./reservas-display.component.css']
})
export class ReservasDisplayComponent {

  constructor(private router: Router) { }

  cards : Reserva[] = [
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

  onReservationClick(reservation: Reserva): void {
    this.router.navigate(['/graficasAdmin'])
  }
}
