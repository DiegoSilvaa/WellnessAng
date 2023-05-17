import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private router: Router) { }
  
  selected: any;
  idSelected: any;
  selectReservation(reservation: any, id: any): void {
    this.selected = reservation;
    this.idSelected = id;
    this.router.navigate(['/instalacionesUser'])
  }
}
