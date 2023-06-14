import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ReservaService } from 'src/app/services/reserva.service';
import { HttpClient } from '@angular/common/http';
import { Subscription, generate, interval } from 'rxjs';
import { Router } from '@angular/router';
import { ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-graficas-admin',
  templateUrl: './graficas-admin.component.html',
  styleUrls: ['./graficas-admin.component.css']
})
export class GraficasAdminComponent {
  
  private refreshInterval!: Subscription;

  constructor(private resRes: ReservaService, private http: HttpClient, private router: Router){}

  instalacionGraf : any = this.resRes.instalacionStats;
  // Chart Options Templates
  lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Semana'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Cantidad de personas'
        }
      }
    }
  };
    
  pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };
  

  startDate!: Date;
  endDate!: Date;
  ngOnInit(): void {
    this.getStats();
    this.filtrarFecha();
    // Obtener la fecha actual
    const today = new Date();
    
    // Obtener la fecha de hace una semana
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(today.getDate() - 7);
    this.startDate = oneWeekAgo;
    this.endDate = today;
    this.filtrarFecha();

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
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgb(54, 162, 235)"
        }]
      },
      options: this.lineChartOptions
      })
  }

  BarChart!: Chart;
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
        }]
      },
      options: this.pieChartOptions
      })
  }

    // ver Comentarios de Pantalla
    verComentarios() {
      this.router.navigate(['/comentarios'])
    }

}  
