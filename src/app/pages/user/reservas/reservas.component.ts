import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/clases/booking';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval } from 'rxjs';

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
    this.http.get<any[]>(this.API).subscribe((results: any) => {
      this.reservas = Object.values(results.data);
      console.log(this.reservas)
      this.reservasArray = Array.isArray(this.reservas) ? this.reservas : [this.reservas];
    });

    this.refreshInterval = interval(10000).subscribe(() => {
      this.http.get<any[]>(this.API).subscribe((results: any) => {
        this.reservas = Object.values(results.data);
        console.log(this.reservas)
        this.reservasArray = Array.isArray(this.reservas) ? this.reservas : [this.reservas];
      });
    });
  }

  ngOnDestroy() {
    if (this.refreshInterval) {
      this.refreshInterval.unsubscribe();
    }
  }

  deleteBooking(booking: any) {
    this.http.delete(this.API);
  }
}
