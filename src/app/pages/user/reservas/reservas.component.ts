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
  }

  ngOnDestroy() {
    if (this.refreshInterval) {
      this.refreshInterval.unsubscribe();
    }
  }
  

  getCentros() {
    this.http.get<any[]>(this.API).subscribe((results: any) => {
      this.reservasArray = Object.values(results.data);
      // Convertir la fecha a formato "aa-mm-dd"
      this.reservasArray.forEach((reserva: any) => {
        const fecha = new Date(reserva.fecha);
        const formattedFecha = fecha.toISOString().slice(0, 10);
        reserva.fecha = formattedFecha;
      });
      
      // Convertir la hora a formato "00:00:00"
      this.reservasArray.forEach((reserva: any) => {
        const hora = new Date(reserva.hora);
        const formattedHora = hora.toTimeString().slice(0, 8);
        reserva.hora = formattedHora;
      });
      
      const observables = this.reservasArray.map((item: any) => {
        const id_instalacion = item.id_instalacion;
        return this.http.get<any[]>(`http://gymcodersapivm.eastus.cloudapp.azure.com:1433/instalacion/${id_instalacion}`);
      });
  
      forkJoin(observables).subscribe((resultsArray: any) => {
        resultsArray.forEach((results: any, index: number) => {
          const instalacion = Object.values(results.data);
          this.reservasArray[index].instalacion = instalacion;
        });
      });
    });
  }
  
	submit(booking: any) {
    const confirmacion = confirm('¿Estás seguro de que cancelar esta Reservacion?');
      if (confirmacion) {
          const url = `http://gymcodersapivm.eastus.cloudapp.azure.com:1433/reservacion/${booking.id_reservacion}/cambiar_estatus/4`;      
          this.http.put(url,null).subscribe((results: any) => {
            console.log(results)
            this.getCentros();
        })
      }
		}
}
