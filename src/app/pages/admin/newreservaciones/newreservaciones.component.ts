import { Component } from '@angular/core';
import { Booking } from 'src/app/clases/booking';
@Component({
  selector: 'app-newreservaciones',
  templateUrl: './newreservaciones.component.html',
  styleUrls: ['./newreservaciones.component.css']
})
export class NewreservacionesComponent {
  bookings: Booking[] = [
    {
      title: 'Reserva 1',
      date: '01/01/2023',
      customerName: 'Cliente 1',
      location: 'Ciudad 1',
      description: 'Descripción de la reserva 1'
    },
    {
      title: 'Reserva 2',
      date: '02/01/2023',
      customerName: 'Cliente 2',
      location: 'Ciudad 2',
      description: 'Descripción de la reserva 2'
    },
    {
      title: 'Reserva 3',
      date: '03/01/2023',
      customerName: 'Cliente 3',
      location: 'Ciudad 3',
      description: 'Descripción de la reserva 3'
    },
    {
      title: 'Reserva 4',
      date: '03/01/2023',
      customerName: 'Cliente 3',
      location: 'Ciudad 3',
      description: 'Descripción de la reserva 3'
    },
    {
      title: 'Reserva 5',
      date: '03/01/2023',
      customerName: 'Cliente 3',
      location: 'Ciudad 3',
      description: 'Descripción de la reserva 3'
    },
    {
      title: 'Reserva 6',
      date: '03/01/2023',
      customerName: 'Cliente 3',
      location: 'Ciudad 3',
      description: 'Descripción de la reserva 3'
    },
  ];

  selectedStatus: string = '';
  installationName: string = '';
  centerName: string = '';

}
