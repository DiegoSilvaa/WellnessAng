import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription, generate, interval } from 'rxjs';
import { ReservaService } from 'src/app/services/reserva.service';


@Component({
  selector: 'app-instalaciones-display',
  templateUrl: './instalaciones-display.component.html',
  styleUrls: ['./instalaciones-display.component.css']
})
export class InstalacionesDisplayComponent implements OnInit {
  private refreshInterval!: Subscription;
  constructor(private router: Router, private resService: ReservaService, private http: HttpClient) {
    this.arrayDeportes = [];
   }

  selectedReserva = this.resService.selected;
  idSelected = this.resService.idSelected;
  arrayDeportes : any;
  
  /// Llamada al Api con ids

  
  // METODO INICIALIZADOR DE PANTALLA
  ngOnInit() {
    console.log(this.selectedReserva.deportes);
    this.getCentros();
    this.refreshInterval = interval(100000).subscribe(() => {
    });
  }

  ngOnDestroy() {
    if (this.refreshInterval) {
      this.refreshInterval.unsubscribe();
    }
  }

  getCentros() {
    this.http.get<any[]>(`http://gymcodersapivm.eastus.cloudapp.azure.com:1433/centro_deportivo/${this.selectedReserva.id_centro_deportivo}/deporte/${this.idSelected.id_deporte}/instalaciones`).subscribe((results: any) => {
      this.arrayDeportes = Object.values(results.data);
      console.log(this.arrayDeportes)
    })
  }

  onReservationClick(reservation: any): void {
    this.resService.selectInstalacion(reservation);
  }
}
