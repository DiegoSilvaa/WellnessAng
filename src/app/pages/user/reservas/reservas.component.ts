import { Component } from '@angular/core';
import { Booking } from 'src/app/clases/booking';
@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent {
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
    {
      title: 'Reserva 7',
      date: '03/01/2023',
      customerName: 'Cliente 3',
      location: 'Ciudad 3',
      description: 'Descripción de la reserva 3'
    },
    {
      title: 'Reserva 8',
      date: '03/01/2023',
      customerName: 'Cliente 3',
      location: 'Ciudad 3',
      description: 'Descripción de la reserva 3'
    }
  ];

  deleteBooking(booking: Booking) {
    const index = this.bookings.indexOf(booking);
    if (index !== -1) {
      this.bookings.splice(index, 1);
    }
  }
}
