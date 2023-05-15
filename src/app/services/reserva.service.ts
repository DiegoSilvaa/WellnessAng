import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private router: Router) { }
  
  selected: any;

  selectReservation(reservation: any): void {
    this.selected = reservation;
    this.router.navigate(['/instalacionesUser'])
  }
}
