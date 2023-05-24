import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/clases/booking';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval } from 'rxjs';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {
  API : string = 'http://gymcodersapivm.eastus.cloudapp.azure.com:1433/alumno/a00832361/reservaciones';
  reservas: any;
  reservasArray: any;
  private refreshInterval!: Subscription;

  constructor(private http: HttpClient) { 
    this.reservas = [];
  }

  ngOnInit() {
    this.getCentros();
    this.refreshInterval = interval(100000).subscribe(() => {
      this.getCentros();
    });
  }

  ngOnDestroy() {
    if (this.refreshInterval) {
      this.refreshInterval.unsubscribe();
    }
  }
  

  getCentros() {
    this.http.get<any[]>(this.API).subscribe((results: any) => {
      this.reservasArray = Object.values(results.data);
      console.log(this.reservasArray);
  
      const observables = this.reservasArray.map((item: any) => {
        const id_instalacion = item.id_instalacion;
        return this.http.get<any[]>(`http://gymcodersapivm.eastus.cloudapp.azure.com:1433/instalacion/${id_instalacion}`);
      });
  
      forkJoin(observables).subscribe((resultsArray: any) => {
        resultsArray.forEach((results: any, index: number) => {
          const instalacion = Object.values(results.data);
          //console.log(deportes);
          this.reservasArray[index].instalacion = instalacion; // Almacena los deportes correspondientes en la propiedad 'deportes' del centro
        });
      });
    });
  }

  deleteBooking(booking: any) {
    this.http.delete(`http://gymcodersapivm.eastus.cloudapp.azure.com:1433/reservacion/${booking.id_reservacion}`)
      .subscribe((response: any) => {
        console.log(response)
      }, (error) => {
        // Manejar errores si la eliminación falla
        console.error(error);
      });
  }
}
