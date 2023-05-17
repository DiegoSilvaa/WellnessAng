import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription, generate, interval } from 'rxjs';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  APIGen : string = 'http://gymcodersapivm.eastus2.cloudapp.azure.com:1433/centro_deportivo/';
  General: any;
  private refreshInterval!: Subscription;

  constructor(private router: Router, private http: HttpClient) { 
    this.General = [];
  }

  // METODO INICIALIZADOR DE PANTALLA
  ngOnInit() {
    this.createBarChart();
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
    this.http.get<any[]>(this.APIGen).subscribe((results: any) => {
      this.General = Object.values(results.data);
      console.log(this.General);
  
      this.General.sort((a: any, b: any) => {
        if (a.esta_habilitado && !b.esta_habilitado) {
          return -1; // a debe aparecer antes que b
        } else if (!a.esta_habilitado && b.esta_habilitado) {
          return 1; // a debe aparecer después de b
        } else {
          return 0; // no se cambia el orden
        }
      });
    });
  }
  
  
  onReservationClick(reservation: any): void {
    this.router.navigate(['/dispReserva'])
  }
  
  // Grafico de centros/Instlaciones
  public BarChart: any;
  createBarChart(){
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
}
