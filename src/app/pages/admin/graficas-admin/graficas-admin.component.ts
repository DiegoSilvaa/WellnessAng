import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ReservaService } from 'src/app/services/reserva.service';
import { HttpClient } from '@angular/common/http';
import { Subscription, generate, interval } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-graficas-admin',
  templateUrl: './graficas-admin.component.html',
  styleUrls: ['./graficas-admin.component.css']
})
export class GraficasAdminComponent {
  
  private refreshInterval!: Subscription;

  constructor(private resRes: ReservaService, private http: HttpClient, private router: Router){}

  instalacionGraf : any = this.resRes.instalacionStats;
  
    
  ngOnInit(): void {
    this.getStats();
  }


  ngOnDestroy() {
    if (this.refreshInterval) {
      this.refreshInterval.unsubscribe();
    }
  }
  
  // API http://gymcodersapivm.eastus.cloudapp.azure.com:1433/calificacion_instalacion/{id}
  calificacion:any;
  cantidad: any;
  getStats() {
    this.http.get<any[]>(`http://gymcodersapivm.eastus.cloudapp.azure.com:1433/calificacion_instalacion/${this.instalacionGraf.id_instalacion}/calificaciones`)
    .subscribe((results: any) => {
      this.calificacion = Object.values(results.data);
      console.log(results.data)
    });

    this.http.get<any[]>(`http://gymcodersapivm.eastus.cloudapp.azure.com:1433/calificacion_instalacion/${this.instalacionGraf.id_instalacion}/calificaciones/cantidad_estrellas
    `)
    .subscribe((results: any) => {
      this.cantidad = Object.values(results.data);
      console.log(results.data)
      this.createBarChart();
    });
  }

  reservasFecha: any;
  startDate!: Date;
  endDate!: Date;
  filtrarFecha() {
    // Cantidad de Reservas por Fecha
    this.http.get<any[]>(`http://gymcodersapivm.eastus.cloudapp.azure.com:1433/instalacion/1/estadisticas_reservas_por_dia/fecha_inicial/${this.startDate}/fecha_final/${this.endDate}`)
    .subscribe((results: any) => {
      this.reservasFecha = Object.values(results.data);
      console.log(results.data)
      this.createLineChart1();
    });
  }
  
  Linechart1!: Chart;
    /// LINE CHART 1 
  createLineChart1(){
    if (this.Linechart1) {
      this.Linechart1.destroy();
    }
    const labels = this.reservasFecha.map((item:any) => {
      // Aquí puedes personalizar el formato de la etiqueta según tus necesidades
      return new Date(item.fecha).toLocaleDateString();
    });
    const values = this.reservasFecha.map((item:any) => item.cantidad_reservas);

    this.Linechart1 = new Chart('Line1', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Cantidad de Reservas',
          data: values,
          borderColor: 'rgb(75, 192, 192)',
          fill: false
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            }
          }
        }
      })
  }

  BarChart!: Chart<'pie'>;
  /// BAR CHART  createChart() Grafico de Pie por calificacion
  createBarChart(){

    if (this.BarChart) {
      this.BarChart.destroy();
    }

    const labels = this.cantidad.map((item:any) => item.calificacion);
    const values = this.cantidad.map((item:any) => item.cantidad_registros);

    this.BarChart = new Chart("barChart", {
      type: 'pie', //this denotes tha type of chart
      data: {
        labels: labels,
        datasets: [{
          label: 'Cantidad De Registros',
          data: values,
          backgroundColor: [
            '#A638B2',
            '#FFE083',
            '#F06AFF',
            '#40CCA9',
            '#41B296'
          ],
        }]
      },
      options: {
        responsive: true,
        }
      })
  }

    // ver Comentarios de Pantalla
    verComentarios() {
      this.router.navigate(['/comentarios'])
    }

}  
