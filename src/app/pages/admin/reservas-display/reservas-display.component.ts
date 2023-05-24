import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservaService } from 'src/app/services/reserva.service';
import { Subscription, generate, interval } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-reservas-display',
  templateUrl: './reservas-display.component.html',
  styleUrls: ['./reservas-display.component.css']
})
export class ReservasDisplayComponent implements OnInit {

  constructor(private router: Router, private resSer: ReservaService, private http: HttpClient) { }
  private refreshInterval!: Subscription;
  currentInstalacion: any = this.resSer.selectedCentroAdmin
  instalaciones: any;
  // METODO INICIALIZADOR DE PANTALLA
  ngOnInit() {
    //console.log(this.currentInstalacion)
    this.getInstalacion();
    this.refreshInterval = interval(1000).subscribe(() => {
      this.getInstalacion();
    });
  }

  ngOnDestroy() {
    if (this.refreshInterval) {
      this.refreshInterval.unsubscribe();
    }
  }

  getInstalacion() {
    this.http.get<any[]>(`http://gymcodersapivm.eastus.cloudapp.azure.com:1433/centro_deportivo/${this.currentInstalacion.id_centro_deportivo}/instalaciones`).subscribe((results: any) => {
      this.instalaciones = Object.values(results.data);
      console.log(this.instalaciones);
    } );
  }

  onReservationClick(reservation: any): void {
    this.resSer.statsInstalacion(reservation);
  }

  onEdit(reservation: any): void {
    this.resSer.editarInstalacion(reservation);
  }

  toggleChanged(instalacion: any) {
    console.log(instalacion)
    const url = `http://gymcodersapivm.eastus.cloudapp.azure.com:1433/instalacion/${instalacion.id_instalacion}/cambiar_estado`;
    
    this.http.put(url,null).subscribe((results: any) => {
      console.log(results)
    })
  }
}
