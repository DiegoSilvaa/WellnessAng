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

  selectedInstalacion: any;
  selectInstalacion(reservation: any): void {
    this.selectedInstalacion = reservation;
    this.router.navigate(['/reservaPage'])
  }

  selectedCentroAdmin: any;
  selectCentro(reservation: any): void {
    this.selectedCentroAdmin = reservation;
    this.router.navigate(['/dispReserva'])  
  }

  centro: any;
  selectedCentro(reserva: any): void {
    this.centro = reserva;
    this.router.navigate(['/editCentro'])  
  }


  instalacionStats: any;
  statsInstalacion(inst: any) {
    this.instalacionStats = inst;
    this.router.navigate(['/graficasAdmin'])
  }  
}
