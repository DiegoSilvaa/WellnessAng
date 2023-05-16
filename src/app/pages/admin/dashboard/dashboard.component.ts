import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { id } from 'date-fns/locale';


interface Reserva {
  id: number;
  description: string;
  image: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private router: Router) { }
  progress = 75;

  reservas : Reserva[] = [
    { id: 1, description: 'Boton 1.1', image: '../../../../assets/centro1.png'},
    { id: 2, description: 'Boton 1.2', image: '../../../../assets/centro1.png'},
    { id: 3, description: 'Boton 1.3', image: '../../../../assets/centro1.png'},
    { id: 4, description: 'Boton 1.3', image: '../../../../assets/centro1.png'},
    { id: 5, description: 'Boton 1.3', image: '../../../../assets/centro1.png'},
    { id: 6, description: 'Boton 1.3', image: '../../../../assets/centro1.png'},

  ];

  onReservationClick(reservation: Reserva): void {
    this.router.navigate(['/dispReserva'])
  }

}
