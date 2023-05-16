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
  APICB1 : string = 'http://gymcodersapivm.eastus2.cloudapp.azure.com:1433/centro_deportivo/1/instalaciones';
  APICB2 : string = 'http://gymcodersapivm.eastus2.cloudapp.azure.com:1433/centro_deportivo/2/instalaciones';
  APIWELL : string = 'http://gymcodersapivm.eastus2.cloudapp.azure.com:1433/centro_deportivo/3/instalaciones';
  APIGen : string = 'http://gymcodersapivm.eastus2.cloudapp.azure.com:1433/centro_deportivo/deportes';

  General: any;
  deportes: any;

  Centro1: any;
  filteredButtons1: any;

  Centro2: any;
  filteredButtons2: any;

  Wellness: any;
  filteredButtons3: any;

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
      console.log(this.General);
    
      // Obtener un array de observables de las llamadas HTTP
      const observables = this.General.map((item:any) => {
        const idCentroDeportivo = item.id_centro_deportivo;
        return this.http.get<any[]>(`http://gymcodersapivm.eastus2.cloudapp.azure.com:1433/centro_deportivo/${idCentroDeportivo}/deportes`);
      });
    
      // Combinar y esperar todas las llamadas HTTP en paralelo
      forkJoin(observables).subscribe((resultsArray: any) => {
        resultsArray.forEach((results: any) => {
          const deportes = Object.values(results.data);
          console.log(deportes);
          // Realiza cualquier otra lógica necesaria con los datos obtenidos
        });
      });
    });
  }


  filterButtons() {
    this.filteredButtons1 = this.deportes.filter((button: any) =>
      button.nombre_deporte.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  onReservationClick(reservation: any): void {
    this.resService.selectReservation(reservation);
  }

  
  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }
}

@Component({
  selector: 'dialog-message',
  templateUrl: 'dialog-mesaage.html',
  styleUrls: ['./home.component.css']
})
export class DialogElementsExampleDialog {
  constructor(public dialogRef: MatDialogRef<HomeComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
