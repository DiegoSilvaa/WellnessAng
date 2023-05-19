import { Component, OnInit, ViewChild } from '@angular/core';
import { TableUtil } from 'src/app/components/export';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-stats-aforo',
  templateUrl: './stats-aforo.component.html',
  styleUrls: ['./stats-aforo.component.css']
})
export class StatsAforoComponent implements OnInit {
  API : string = 'http://gymcodersapivm.eastus.cloudapp.azure.com:1433/registro_gimnasio';
  registro: any;
  registroArray: any = new MatTableDataSource<any>();
  private refreshInterval!: Subscription;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(private http: HttpClient) { 
    this.registro = [];
  }

  ngOnInit() {
    this.getRegistro();
    this.createLineChart1();
    this.createLineChart2();

    this.refreshInterval = interval(10000).subscribe(() => {
      this.getRegistro();
    });
    this.registroArray.paginator = this.paginator;
  }

  ngOnDestroy() {
    if (this.refreshInterval) {
      this.refreshInterval.unsubscribe();
    }
  }

  getRegistro() {
    this.http.get<any[]>(this.API).subscribe((results: any) => {
      this.registro = Object.values(results.data);
      console.log(this.registro)
      this.registroArray = Array.isArray(this.registro) ? this.registro : [this.registro];
    });
  }

  displayedColumns = ['id_registro', 'matricula', 'fecha'];


  exportTable() {
    TableUtil.exportTableToExcel("ExampleMaterialTable");
  }

  exportNormalTable() {
    TableUtil.exportTableToExcel("ExampleNormalTable");
  }

  public Linechart1: any;
  public Linechart2: any;

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

  createLineChart2(){
    this.Linechart2 = new Chart('Line2', {
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



}
