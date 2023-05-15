import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval } from 'rxjs';
import { ReservaService } from 'src/app/services/reserva.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  APICB1 : string = 'http://gymcodersapivm.eastus2.cloudapp.azure.com:1433/centro_deportivo/1/instalaciones';
  APICB2 : string = 'http://gymcodersapivm.eastus2.cloudapp.azure.com:1433/centro_deportivo/2/instalaciones';
  APIWELL : string = 'http://gymcodersapivm.eastus2.cloudapp.azure.com:1433/centro_deportivo/3/instalaciones';

  Centro1: any;
  filteredButtons1: any;

  Centro2: any;
  filteredButtons2: any;

  Wellness: any;
  filteredButtons3: any;

  searchQuery = '';

  private refreshInterval!: Subscription;

  constructor(private router: Router, private resService: ReservaService, public dialog: MatDialog, private http: HttpClient) { 
    this.Centro1 = [];
    this.Centro2 = [];
    this.Wellness = [];
  }
  

  // METODO INICIALIZADOR DE PANTALLA
  ngOnInit() {
    this.getCentros1();
    this.getCentros2();
    this.getCentros3();
    this.refreshInterval = interval(100000).subscribe(() => {
      this.getCentros1();
      this.getCentros2();
      this.getCentros3();
    });
  }

  ngOnDestroy() {
    if (this.refreshInterval) {
      this.refreshInterval.unsubscribe();
    }
  }
  
  // Funcion para llamar a los centros Deportivos 1
  getCentros1() {
    this.http.get<any[]>(this.APICB1).subscribe((results: any) => {
      this.Centro1 = Object.values(results.data);
      console.log(this.Centro1)
      this.filteredButtons1 = Array.isArray(this.Centro1) ? this.Centro1 : [this.Centro1];
    });
  }

  // Funcion para llamar a los centros Deportivos 2
  getCentros2() {
    this.http.get<any[]>(this.APICB2).subscribe((results: any) => {
      this.Centro2 = Object.values(results.data);
      console.log(this.Centro2)
      this.filteredButtons2 = Array.isArray(this.Centro2) ? this.Centro2 : [this.Centro2];
    });
  }

  // Funcion para llamar a los centros WEllness
  getCentros3() {
    this.http.get<any[]>(this.APIWELL).subscribe((results: any) => {
      this.Wellness = Object.values(results.data);
      console.log(this.Wellness)
      this.filteredButtons3 = Array.isArray(this.Wellness) ? this.Wellness : [this.Wellness];
    });
  }

  filterButtons() {
    this.filteredButtons1 = this.Centro1.filter((button: any) =>
      button.deporte.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    this.filteredButtons2 = this.Centro2.filter((button: any) =>
      button.deporte.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    this.filteredButtons3 = this.Wellness.filter((button: any) =>
      button.deporte.toLowerCase().includes(this.searchQuery.toLowerCase())
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
