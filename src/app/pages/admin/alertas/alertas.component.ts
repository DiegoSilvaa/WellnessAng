import { Component } from '@angular/core';
import { Notificacion } from 'src/app/clases/notificacion';
import { Router } from '@angular/router';
import { AdminAlertaService } from 'src/app/services/admin-alerta.service';
@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent {
  constructor(private router: Router, private alertaService: AdminAlertaService) { }

  alerta = this.alertaService.notificaciones;
  
  
  crearAviso() {
    this.router.navigate(['/crearAviso']);
  }

  editarAviso(not: Notificacion) : void {
    this.alertaService.selectReservation(not)
    this.router.navigate(['/editarAviso']);
  }
}