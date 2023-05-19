import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAlertaService } from 'src/app/services/admin-alerta.service';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent {
  API : string = 'http://gymcodersapivm.eastus.cloudapp.azure.com:1433/avisos';
  notificaciones: any;
  notificacionesArray: any;
  private refreshInterval!: Subscription;

  constructor(private router: Router, private alertaService: AdminAlertaService,private http: HttpClient) { 
    this.notificaciones = [];
  }

  ngOnInit() {
    this.http.get<any[]>(this.API).subscribe((results: any) => {
      this.notificaciones = Object.values(results.data);
      console.log(this.notificaciones)
      this.notificacionesArray = Array.isArray(this.notificaciones) ? this.notificaciones : [this.notificaciones];
    });

    this.refreshInterval = interval(10000).subscribe(() => {
      this.http.get<any[]>(this.API).subscribe((results: any) => {
        this.notificaciones = Object.values(results.data);
        console.log(this.notificaciones)
        this.notificacionesArray = Array.isArray(this.notificaciones) ? this.notificaciones : [this.notificaciones];
      });
    });
  }

  ngOnDestroy() {
    if (this.refreshInterval) {
      this.refreshInterval.unsubscribe();
    }
  }

  crearAviso() {
    this.router.navigate(['/crearAviso']);
  }

  editarAviso(not: any) : void {
    this.alertaService.selectReservation(not)
    this.router.navigate(['/editarAviso']);
  }
  
  confirmarEliminacion(reservation: any) {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este elemento?');
    if (confirmacion) {
      // Lógica para eliminar el elemento
      this.eliminarAviso(reservation);
    } else {
      alert('No se elimino el aviso, ya que cancelaste la confirmacion')
    }
  }

  eliminarAviso (not: any) {
    this.http.delete(`http://gymcodersapivm.eastus.cloudapp.azure.com:1433/avisos/${not.id_aviso}`).subscribe(
      () => {
        console.log('Elemento eliminado exitosamente');
      },
      error => {
        console.error('Error al eliminar el elemento', error);
      }
    );
  }

}