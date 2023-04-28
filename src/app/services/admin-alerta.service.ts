import { Injectable } from '@angular/core';
import { Notificacion } from '../clases/notificacion';

@Injectable({
  providedIn: 'root'
})
export class AdminAlertaService {

  constructor() { }

  notificaciones: Notificacion[] = [
    {
      title: 'Notificacion 1',
      asunto:'Cierre' ,
      date: '01/01/2023',
      descripcion :'Va a estar cerrado'
    },
    {
      title: 'Notificacion 2',
      asunto:'Cierre' ,
      date: '01/01/2023',
      descripcion :'Va a estar cerrado'
    },
    {
      title: 'Notificacion 3',
      asunto:'Cierre' ,
      date: '01/01/2023',
      descripcion :'Va a estar cerrado'
    },
    {
      title: 'Notificacion 4',
      asunto:'Cierre' ,
      date: '01/01/2023',
      descripcion :'Va a estar cerrado'
    }
  ];

  selectedAlerta: Notificacion | null = null;

  selectReservation(alerta: Notificacion): void {
    this.selectedAlerta = alerta;
  }
}

