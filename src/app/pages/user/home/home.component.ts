import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription, generate, interval } from 'rxjs';
import { ReservaService } from 'src/app/services/reserva.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  APIGen : string = 'http://gymcodersapivm.eastus.cloudapp.azure.com:1433/centro_deportivo/';

  General: any;
  deportes: any;
  deportesFiltrados: any;
  searchQuery = '';

  private refreshInterval!: Subscription;

  constructor(private router: Router, private resService: ReservaService, public dialog: MatDialog, private http: HttpClient) { 
    this.General = [];
    this.deportes =[];
  }
  

  // METODO INICIALIZADOR DE PANTALLA
  ngOnInit() {
    this.getCentros();
    this.refreshInterval = interval(100000).subscribe(() => {
    
    });
  }

  ngOnDestroy() {
    if (this.refreshInterval) {
      this.refreshInterval.unsubscribe();
    }
  }
  
  // Funcion General de llamda de APIS

  getCentros() {
    this.http.get<any[]>(this.APIGen).subscribe((results: any) => {
      this.General = Object.values(results.data);
      this.deportesFiltrados =  Object.values(results.data);
      console.log(this.General);
  
      const observables = this.General.map((item: any) => {
        const idCentroDeportivo = item.id_centro_deportivo;
        return this.http.get<any[]>(`http://gymcodersapivm.eastus.cloudapp.azure.com:1433/centro_deportivo/${idCentroDeportivo}/deportes`);
      });
  
      forkJoin(observables).subscribe((resultsArray: any) => {
        resultsArray.forEach((results: any, index: number) => {
          const deportes = Object.values(results.data);
          //console.log(deportes);
          this.General[index].deportes = deportes; // Almacena los deportes correspondientes en la propiedad 'deportes' del centro
          this.deportesFiltrados[index].deportes = deportes;
          console.log(this.deportesFiltrados);
        });
      });
    });
  }
  


  filterButtons() {
    const filteredCentros = [];

    for (let i = 0; i < this.General.length; i++) {
      const centro = this.General[i];
      const filteredDeportes = centro.deportes.filter((deporte:any) =>
        deporte.nombre_deporte.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
  
      if (filteredDeportes.length > 0) {
        filteredCentros.push({
          ...centro,
          deportes: filteredDeportes
        });
      }
    }
  
    this.deportesFiltrados = filteredCentros;
  }

  onReservationClick(reservation: any, id: any): void {
    this.resService.selectReservation(reservation, id);
  }
}
