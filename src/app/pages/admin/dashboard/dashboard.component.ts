import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription, generate, interval } from 'rxjs';
import Chart from 'chart.js/auto';
import { ReservaService } from 'src/app/services/reserva.service';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  APIGen : string = 'http://gymcodersapivm.eastus.cloudapp.azure.com:1433/centro_deportivo/';
  General: any;
  private refreshInterval!: Subscription;
  nombresCentros: any;
  numCentros: any;
  constructor(private router: Router, private http: HttpClient, private resService: ReservaService) { 
    this.General = [];
  }
  
  // Selecconar Centro para editar
  
  onEditCentro(centro: any) {
    this.resService.selectedCentro(centro);
  }
  
  // METODO INICIALIZADOR DE PANTALLA
  ngOnInit() {
    this.getCentros();
    this.refreshInterval = interval(1000).subscribe(() => {
      this.getCentros();
    });
    setTimeout(() => {
      this.createBarChart();
    }, 1000);
  }


  ngOnDestroy() {
    if (this.refreshInterval) {
      this.refreshInterval.unsubscribe();
    }
  }
  
  getCentros() {
    this.http.get<any[]>(this.APIGen).subscribe((results: any) => {
      this.General = Object.values(results.data);
      console.log(this.General);
      this.nombresCentros = this.General.map((centro:any) => centro.nombre);
      // Realizar una solicitud HTTP para cada centro y obtener el número de instalaciones
      const observables = this.General.map((item: any) => {
        const idCentroDeportivo = item.id_centro_deportivo;
        this.http.get<any[]>(`http://gymcodersapivm.eastus.cloudapp.azure.com:1433/centro_deportivo/${idCentroDeportivo}/instalaciones`).subscribe((result:any) =>{
          //console.log(result.data)
        });
        return this.http.get<any[]>(`http://gymcodersapivm.eastus.cloudapp.azure.com:1433/centro_deportivo/${idCentroDeportivo}/instalaciones`);
      });
  
      forkJoin(observables).subscribe((resultsArray: any) => {
        this.numCentros = resultsArray.map((instalaciones: any) => instalaciones.data.length);
        //console.log(this.numCentros);
      });
    });
    
  }
  
  // Grafico de centros/Instlaciones
  BarChart!: Chart<'pie'>;
  createBarChart(){
    if (this.BarChart) {
      this.BarChart.destroy();
    }
    this.BarChart = new Chart("barChart", {
      type: 'pie', //this denotes tha type of chart
      data: {
        labels: this.nombresCentros,
        datasets: [{
          label: 'Instalaciones',
          data: this.numCentros,
          backgroundColor: [
            '#408dff',
            '#007bff',
            '#66a3ff',
            '#005cbf',
            '#3377ff',
            '#003f7f'
          ],
        }]
      },
      options: {
        responsive: true,
        }
      })
  }

  onReservationClick(reservation: any): void {
    this.resService.selectCentro(reservation);
  }

  //eliminar centro deportivo
  onEliminar(button:any) {
    const url = `http://gymcodersapivm.eastus.cloudapp.azure.com:1433/centro_deportivo/${button.id_centro_deportivo}`;
    const confirmacion = confirm('¿Estás seguro de que deseas borrar este Centro Deportivo?');
    		if (confirmacion) {
          this.http.delete(url).subscribe((results: any) => {
            console.log(results)
            alert('Borraste el centro deportivo')
          })
        } else {
          return;
        }
  }
  

  toggleChanged(centro: any) {
    const url = `http://gymcodersapivm.eastus.cloudapp.azure.com:1433/centro_deportivo/${centro.id_centro_deportivo}/cambiar_estado`;
    
    this.http.put(url,null).subscribe((results: any) => {
      console.log(results)
    })
  }
}
