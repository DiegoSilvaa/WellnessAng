import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-newreservaciones',
  templateUrl: './newreservaciones.component.html',
  styleUrls: ['./newreservaciones.component.css']
})
export class NewreservacionesComponent implements OnInit{
  
  selectedStatus: any;
  installationName:any;
  centerName:any;
	constructor(private http: HttpClient) {}
  ngOnInit() {
    this.getCentros();
  }

  reservas: any;
  reservasFiltradas: any;
	getCentros() {
		const url = `http://gymcodersapivm.eastus.cloudapp.azure.com:1433/reservacion`;
		this.http.get<any[]>(url).subscribe((results: any) => {
      this.reservas = Object.values(results.data);
      this.reservasFiltradas = Object.values(results.data);
      console.log(this.reservas);
      // Convertir la fecha a formato "aa-mm-dd"
      this.reservasFiltradas.forEach((reserva: any) => {
        const fecha = new Date(reserva.fecha);
        const formattedFecha = fecha.toISOString().slice(0, 10);
        reserva.fecha = formattedFecha;
      });
      
      // Convertir la hora a formato "00:00:00"
      this.reservasFiltradas.forEach((reserva: any) => {
        const hora = new Date(reserva.hora);
        const formattedHora = hora.toTimeString().slice(0, 8);
        reserva.hora = formattedHora;
      });

      const observables = this.reservas.map((item: any) => {
        const id_instalacion = item.id_instalacion;
        return this.http.get<any[]>(`http://gymcodersapivm.eastus.cloudapp.azure.com:1433/instalacion/${id_instalacion}/con_centro_deportivo`);
      });
  
      forkJoin(observables).subscribe((resultsArray: any) => {
        resultsArray.forEach((results: any, index: number) => {
          const instalacion = Object.values(results.data);
          this.reservas[index].instalacion = instalacion;
          this.reservasFiltradas[index].instalacion = instalacion;
        });
      });
    });
	}

  aplicarFiltros() {
    // Filtrar las reservas por estado
  this.reservasFiltradas = this.reservas
  console.log(this.installationName,this.centerName )
  if (this.selectedStatus) {
    this.reservasFiltradas = this.reservasFiltradas.filter((reserva: any) => reserva.id_estatus.toString() === this.selectedStatus);
  }

  // Filtrar las reservas por nombre de instalación
  if (this.installationName) {
    this.reservasFiltradas = this.reservasFiltradas.filter((reserva: any) =>
      reserva.instalacion.some((instalacion: any) => instalacion.nombre_instalacion.toLowerCase().includes(this.installationName.toLowerCase()))
    );
  }

  // Filtrar las reservas por nombre de centro
  if (this.centerName) {
    this.reservasFiltradas = this.reservasFiltradas.filter((reserva: any) =>
      reserva.instalacion.some((instalacion: any) => instalacion.nombre_centro_deportivo.toLowerCase().includes(this.centerName.toLowerCase()))
    );
  }

  // Las reservas filtradas están en la variable reservasFiltradas
  console.log(this.reservasFiltradas);
  }
}
