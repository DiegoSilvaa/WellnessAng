import { Component, OnInit, ViewChild } from '@angular/core';
import { TableUtil } from 'src/app/components/export';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { formatDate } from '@angular/common';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-tabla-gym',
  templateUrl: './tabla-gym.component.html',
  styleUrls: ['./tabla-gym.component.css']
})

export class TablaGymComponent {
  API : string = 'http://gymcodersapivm.eastus.cloudapp.azure.com:1433/registro_gimnasio';
  searchQuery = '';
  registro: any;
  registroArray: any;
  filteredDataSource: MatTableDataSource<any>; // Reemplaza 'YourDataType' con el tipo de dato de tus registros
  resultsLength = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  form!: FormGroup;
  displayedColumns = ['id_registro', 'matricula', 'fecha'];
  private refreshInterval!: Subscription;
  constructor(private http: HttpClient, private formBuilder: FormBuilder) { 
    this.registro = [];
    this.filteredDataSource = new MatTableDataSource(this.registroArray);
    this.filteredDataSource.paginator = this.paginator;

  }
  
  ngOnInit() {
    this.form = this.formBuilder.group({
  		aforoMax: ['', Validators.required],
  		aforoActual: ['', Validators.required],
	  });
    this.getRegistro();
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
      this.filteredDataSource = new MatTableDataSource(this.registroArray);
    });
  }
  
  
  // Exportar tablas de Registro a Excel
  exportTable() {
    TableUtil.exportTableToExcel("MaterialTable");
  }
  exportNormalTable() {
    TableUtil.exportTableToExcel("MaterialTable");
  }

  fecha1 = '';
  fecha2 = '';
  filterButtons(selectedDate: any) {
    const filteredData = this.registroArray.filter((element:any) => {
      // En este ejemplo, se filtra si la fecha del elemento es igual a la fecha seleccionada
      const elementDate = new Date(element.fecha);
      elementDate.setDate(elementDate.getDate() + 1); // Suma 1 día a la fecha
    
      const selectedDateValue = new Date(selectedDate);
      selectedDateValue.setDate(selectedDateValue.getDate() + 1); // Suma 1 día a la fecha

      this.fecha1 = formatDate(selectedDateValue, 'yyyy-MM-dd', 'en');
      // Formatear fecha2
      this.fecha2 = formatDate(elementDate, 'yyyy-MM-dd', 'en');

      // Filtrar si las fechas son iguales

      console.log(this.fecha1)
      console.log(this.fecha2)

      return this.fecha1 === this.fecha2;
    });

    this.filteredDataSource.data = filteredData;
  }
}
