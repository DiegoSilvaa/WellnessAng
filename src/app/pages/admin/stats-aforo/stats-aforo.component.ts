import { Component, OnInit, ViewChild } from '@angular/core';
import { TableUtil } from 'src/app/components/export';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { formatDate } from '@angular/common';
import Chart from 'chart.js/auto';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-stats-aforo',
  templateUrl: './stats-aforo.component.html',
  styleUrls: ['./stats-aforo.component.css']
})
export class StatsAforoComponent {
  API : string = 'http://gymcodersapivm.eastus.cloudapp.azure.com:1433/registro_gimnasio';
  searchQuery = '';
  registro: any;
  startDate!: Date;
  endDate!: Date;

  displayedColumns = ['id_registro', 'matricula', 'fecha'];
  private refreshInterval!: Subscription;
  constructor(private http: HttpClient, private formBuilder: FormBuilder) { 
    this.registro = [];
  }
  

  // Obtener datos de fechas y cantidad de matriculas en esa fecha
  fechas:any;
  getAlumnosPorFecha(fechaIni: any, fechaFin: any) {
    this.http.get<any[]>(`http://gymcodersapivm.eastus.cloudapp.azure.com:1433/registro_gimnasio/estadisticas_personas_por_dia/fecha_inicial/${fechaIni}/fecha_final/${fechaFin}`)
    .subscribe((results: any) => {
      this.fechas = Object.values(results.data);
      console.log(this.fechas)
    });
  }

  // Obtener datos de fechas y cantidad de matriculas en esa fecha
  alumnosReg:any;
  getAlumnosMasRegistros(fechaIni: any, fechaFin: any) {
    this.http.get<any[]>(`http://gymcodersapivm.eastus.cloudapp.azure.com:1433/registro_gimnasio/top_asistencia_alumnos/fecha_inicial/${fechaIni}/fecha_final/${fechaFin}`)
    .subscribe((results: any) => {
      this.alumnosReg = Object.values(results.data);
      console.log(this.alumnosReg)
    });
  }

  // Filtrar Graficas
  FiltroGraficas() {
    this.getAlumnosMasRegistros(this.startDate,this.endDate);
    this.getAlumnosPorFecha(this.startDate,this.endDate);
    setTimeout(() => {
      this.createLineChart1();
      this.createLineChart2();
    }, 1000);
  }
  
  
  // Exportar tablas de Registro a Excel
  exportTable() {
    TableUtil.exportTableToExcel("MaterialTable");
  }
  exportNormalTable() {
    TableUtil.exportTableToExcel("MaterialTable");
  }
  

  Linechart1!: Chart;
  /// LINE CHART 1 
  createLineChart1(){
    if (this.Linechart1) {
      this.Linechart1.destroy();
    }
    const labels = this.fechas.map((item:any) => {
      // Aquí puedes personalizar el formato de la etiqueta según tus necesidades
      return new Date(item.fecha).toLocaleDateString();
    });

    const values = this.fechas.map((item:any) => item.cantidad_registros);

    this.Linechart1 = new Chart('Line1', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Registros Por Fecha',
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

  pie!: Chart<'pie'>;

  createLineChart2(){
    if (this.pie) {
      this.pie.destroy();
    }
    const labels = this.alumnosReg.map((item:any) => item.matricula);
    const values = this.alumnosReg.map((item:any) => item.cantidad_repeticiones);

    this.pie = new Chart("Pie1", {
      type: 'pie', //this denotes tha type of chart
      data: {
        labels: labels,
        datasets: [{
          label: 'Mas Ingresos',
          data: values,
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
}
