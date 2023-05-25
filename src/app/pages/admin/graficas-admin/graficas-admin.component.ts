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
    this.createBarChart();
    this.createLineChart1();
    this.createLineChart2()
    this.getStats();
    this.refreshInterval = interval(10000).subscribe(() => {
    });
  }


  ngOnDestroy() {
    if (this.refreshInterval) {
      this.refreshInterval.unsubscribe();
    }
  }
  
  // API http://gymcodersapivm.eastus.cloudapp.azure.com:1433/calificacion_instalacion/{id}
  calificacion:any;
  getStats() {
    this.http.get<any[]>(`http://gymcodersapivm.eastus.cloudapp.azure.com:1433/instalacion/${this.instalacionGraf.id_instalacion}/calificaciones`)
    .subscribe((results: any) => {
      this.calificacion = Object.values(results.data);
      console.log(results.data)
    });
  }
  
  Linechart1!: Chart;
  Linechart2!: Chart;
  /// LINE CHART 1 
  createLineChart1(){
    this.Linechart1 = new Chart('Line1', {
      type: 'line',
      data: {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"],
        datasets: [{
          label: 'Ventas',
          data: [12, 19, 3, 5, 2, 3, 10],
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
  /// LINE CHART 2
  createLineChart2(){
    this.Linechart1 = new Chart('Line2', {
      type: 'line',
      data: {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"],
        datasets: [{
          label: 'Ventas',
          data: [12, 19, 3, 5, 2, 3, 10],
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
  
      this.BarChart = new Chart("barChart", {
        type: 'pie', //this denotes tha type of chart
        data: {
          labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
          datasets: [{
            label: 'Ventas',
            data: [12, 19, 3, 5, 2],
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
