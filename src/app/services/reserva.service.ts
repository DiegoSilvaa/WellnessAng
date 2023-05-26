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
  
  // Pasar info de centro para mostrar instalacion por Centro
  selectedCentroAdmin: any;
  selectCentro(reservation: any): void {
    this.selectedCentroAdmin = reservation;
    this.router.navigate(['/dispReserva'])  
  }

  // Pasar info de centro por Editar
  centro: any;
  selectedCentro(reserva: any): void {
    this.centro = reserva;
    this.router.navigate(['/editCentro'])  
  }

  
  // Pasar Info de instalacion para mostrar Graficas por Instalacion
  instalacionStats: any;
  statsInstalacion(inst: any) {
    this.instalacionStats = inst;
    this.router.navigate(['/graficasAdmin'])
  }  

  // Pasar info de instalacion por Editar
  editarInstalacion(inst: any) {
    this.instalacionStats = inst;
    this.router.navigate(['/editInstalacion'])
  }  


  // Seleccionat hora y fecha para reservas de alumno
  horarioConfirmacion: any;
  confirmaHorario(selected:any, hora:any){
    this.horarioConfirmacion = [selected, hora]
    this.router.navigate(['/reservaConf'])
  }
}
