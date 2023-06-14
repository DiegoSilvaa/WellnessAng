import { Component, OnInit, ViewChild } from '@angular/core';
import { TableUtil } from 'src/app/components/export';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { formatDate } from '@angular/common';
import Chart from 'chart.js/auto';
import { DatePipe } from '@angular/common';
import { forkJoin } from 'rxjs';
import { ChartDataset, ChartOptions } from 'chart.js';
import * as moment from 'moment';
import { WorkBook, utils, writeFile, write } from 'xlsx';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-stats-aforo',
  templateUrl: './stats-aforo.component.html',
  styleUrls: ['./stats-aforo.component.css']
})
export class StatsAforoComponent implements OnInit{
  API : string = 'http://gymcodersapivm.eastus.cloudapp.azure.com:1433/registro_gimnasio';
  searchQuery = '';
  registro: any;
  startDate!: Date;
  endDate!: Date;
  
  constructor(private http: HttpClient, private formBuilder: FormBuilder) { 
    this.registro = [];
  }

  ngOnInit(): void {
    this.getRegistrosSemana()
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

  //Obtener total de datos Semanales
  registrosXSemana: any;  
  LinechartData: ChartDataset[] = [];
  lineChartLabel: any = []
  pieData: ChartDataset[] = [];
  pieChartLabel: any = []

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

  getRegistrosSemana() {
    this.http.get<any[]>(`http://gymcodersapivm.eastus.cloudapp.azure.com:1433/registro_gimnasio/estadisticas_ultimas_5_semanas`)
    .subscribe((results: any) => {
      this.registrosXSemana = Object.values(results.data);
      const requests = this.registrosXSemana.map((registro: any) => {
        return this.http.get<any>(`http://gymcodersapivm.eastus.cloudapp.azure.com:1433/registro_gimnasio/estadisticas_personas_por_dia/fecha_inicial/${registro.fecha_inicio}/fecha_final/${registro.fecha_fin}`)
      });

      forkJoin(requests).subscribe((responses: any) => {
        this.registrosXSemana.personasDia = responses;
        this.LinechartData = this.registrosXSemana.personasDia.map((registro: any, index:any) => {
          //console.log(registro.data)
          return {
            data: registro.data.map((item: any) => {
              //console.log(item.cantidad_registros)
              return item.cantidad_registros}),
            label: `Registros Por Fecha`
          };
        });

        this.lineChartLabel = this.registrosXSemana.personasDia.map((registro: any, index:any) => {
          return {
            labels: registro.data.map((item: any) => {
              //console.log(item.fecha)
              const fechaFormateada = moment(item.fecha).format('DD/MM'); // Formato de fecha deseado
              return fechaFormateada;
            }),
          };
        });

        this.registrosXSemana.personasDia.forEach((_:any, index:any) => {
          this.createLineChart(index);
        });
      });

      const requests2 = this.registrosXSemana.map((registro: any) => {
        return this.http.get<any>(`http://gymcodersapivm.eastus.cloudapp.azure.com:1433/registro_gimnasio/top_asistencia_alumnos/fecha_inicial/${registro.fecha_inicio}/fecha_final/${registro.fecha_fin}`)
      });

      forkJoin(requests2).subscribe((responses: any) => {
        this.registrosXSemana.masPersonas = responses;
        console.log(this.registrosXSemana)
        // Para Graficos de Pie
        this.pieData = this.registrosXSemana.masPersonas.map((registro: any, index:any) => {
          return {
            data: registro.data.map((item: any) => {
              //console.log(item.cantidad_registros)
              return item.cantidad_repeticiones}),
            label: `Personas con mas registros`,
          };
        });

        this.pieChartLabel = this.registrosXSemana.masPersonas.map((registro: any, index:any) => {
          return {
            labels: registro.data.map((item: any) => {
              return item.matricula;
            }),
          };
        });

        this.registrosXSemana.masPersonas.forEach((_:any, index:any) => {
          this.createPieChart(index);
        });
      });
    });   
  }

  
  // Metodos para crear Graficos
  lineChart!: Chart;
  pieChart!: Chart;
  createLineChart(index: number) {
    //console.log(index)
    const canvas = document.getElementById(`Line1${index}`) as HTMLCanvasElement;
    //console.log(canvas)
    //console.log(this.LinechartData[index])
    if (canvas) {
      console.log(this.LinechartData[index])
      const ctx = canvas.getContext('2d');
      //console.log(this.lineChartLabel[index].labels)
      if (ctx) {
        this.lineChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: this.lineChartLabel[index].labels,
            datasets: [this.LinechartData[index]]
          },
          options: this.lineChartOptions
        });
      }
    }
  }

  createPieChart(index: number) {
    const canvas = document.getElementById(`Pie1${index}`) as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        this.pieChart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: this.pieChartLabel[index].labels,
            datasets: [this.pieData[index]]
          },
          options: this.pieChartOptions
        });
      }
    }
  }

  
// Exportar Excel Grafica Linea

exportToExcelLine(index: number) {
  const lineChartData = this.LinechartData[index];
  const lineChartLabels = this.lineChartLabel[index].labels;

  const data: any[] = [];
  data.push(lineChartLabels);
  data.push(lineChartData.data);

  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos del Gráfico');

  XLSX.writeFile(workbook, `graficoLine_${index}.xlsx`);
}

// Exportar Graficas de Pie
exportToExcelPie(index: number) {
  const pieData = this.pieData[index];
  const pieChartLabels = this.pieChartLabel[index].labels;

  const data: any[] = [];
  data.push(pieChartLabels);
  data.push(pieData.data);

  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos del Gráfico');

  XLSX.writeFile(workbook, `graficoPie_${index}.xlsx`);
}

// Exportar Todas las Graficas
exportAllToExcel() {
  const workbook = XLSX.utils.book_new();

  // Exportar gráficos de línea
  for (let i = 0; i < this.LinechartData.length; i++) {
    const lineChartData = this.LinechartData[i];
    const lineChartLabels = this.lineChartLabel[i].labels;

    const data: any[] = [];
    data.push(lineChartLabels);
    data.push(lineChartData.data);

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, `Datos del Gráfico de Línea ${i}`);
  }

  // Exportar gráficos de pie
  for (let i = 0; i < this.pieData.length; i++) {
    const pieData = this.pieData[i];
    const pieChartLabels = this.pieChartLabel[i].labels;

    const data: any[] = [];
    data.push(pieChartLabels);
    data.push(pieData.data);

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, `Datos del Gráfico de Pie ${i}`);
  }

  XLSX.writeFile(workbook, 'graficos.xlsx');
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


Linechart1!: Chart;
/// LINE CHART 1 
createLineChart1(){
  const canvas = document.getElementById(`Line1`) as HTMLCanvasElement;
  console.log(canvas)
  if (canvas) {
    const ctx = canvas.getContext('2d');
    //console.log(this.lineChartLabel[index].labels)
    if (ctx) {
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
          }]
        },
        options: this.lineChartOptions
      })
    }
  }
}

pie!: Chart;

createLineChart2(){
  const canvas = document.getElementById(`Pie1`) as HTMLCanvasElement;
  console.log(canvas)
  if (canvas) {
    const ctx = canvas.getContext('2d');
    //console.log(this.lineChartLabel[index].labels)
    if (ctx) {
      const labels = this.alumnosReg.map((item:any) => item.matricula);
      const values = this.alumnosReg.map((item:any) => item.cantidad_repeticiones);
    
      this.pie = new Chart("Pie1", {
        type: 'pie', //this denotes tha type of chart
        data: {
          labels: labels,
          datasets: [{
            label: 'Mas Ingresos',
            data: values,
          }]
        },
        options: this.pieChartOptions
      })
    }
  }
}

exportToExcelLine1() {
  const lineChartData = this.fechas.map((item: any) => {
    return {
      fecha: new Date(item.fecha).toLocaleDateString(),
      cantidad_registros: item.cantidad_registros
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(lineChartData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Registros de Alumnos por Fecha');

  XLSX.writeFile(workbook, 'graficoLine1.xlsx');
}

exportToExcelPie1() {
  const pieData = this.alumnosReg.map((item: any) => {
    return {
      matricula: item.matricula,
      cantidad_repeticiones: item.cantidad_repeticiones
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(pieData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Personas con mayor asistencia al Gimnasio');

  XLSX.writeFile(workbook, 'graficoPie1.xlsx');
}

}
