import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-graficas-admin',
  templateUrl: './graficas-admin.component.html',
  styleUrls: ['./graficas-admin.component.css']
})
export class GraficasAdminComponent {
  public Linechart1: any;
  public Linechart2: any;
  public BarChart: any;

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
  
  /// BAR CHART  createChart(){
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

  
  ngOnInit(): void {
    this.createBarChart();
    this.createLineChart1();
    this.createLineChart2()
  }

}  
