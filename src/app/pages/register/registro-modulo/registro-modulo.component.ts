import { Component, OnInit, ViewChild } from '@angular/core';
import { TableUtil } from 'src/app/components/export';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-registro-modulo',
  templateUrl: './registro-modulo.component.html',
  styleUrls: ['./registro-modulo.component.css']
})

export class RegistroModuloComponent implements OnInit{
  
  API : string = 'http://gymcodersapivm.eastus.cloudapp.azure.com:1433/registro_gimnasio';
  searchQuery = '';
  registro: any;
  registroArray: any;
  filteredDataSource: MatTableDataSource<any>; // Reemplaza 'YourDataType' con el tipo de dato de tus registros


  form!: FormGroup;
  displayedColumns = ['id_registro', 'matricula', 'fecha'];
  private refreshInterval!: Subscription;
  constructor(private http: HttpClient, private formBuilder: FormBuilder) { 
    this.registro = [];
    this.filteredDataSource = new MatTableDataSource(this.registroArray);
  }
  
  ngOnInit() {
    this.form = this.formBuilder.group({
  		aforoMax: ['', Validators.required],
  		aforoActual: ['', Validators.required],
	  });
  }

  ngOnDestroy() {
    if (this.refreshInterval) {
      this.refreshInterval.unsubscribe();
    }
  }  
  
  // Exportar tablas de Registro a Excel
  exportTable() {
    TableUtil.exportTableToExcel("MaterialTable");
  }
  exportNormalTable() {
    TableUtil.exportTableToExcel("MaterialTable");
  }
  
  
  // Cambiar Aforo

  guardarCambios() {
    if (this.form.valid) {
      // El formulario es válido, puedes continuar con el procesamiento
      const url = `http://gymcodersapivm.eastus.cloudapp.azure.com:1433/gimnasio/1`;
      const data = {
        "aforo_maximo": this.form.get('aforoMax')?.value,
        "aforo_actual": this.form.get('aforoActual')?.value,
      };
      
      this.http.put(url, data).subscribe((results: any) => {
        console.log(results);
      });
      
      this.form.reset();
    } else {
      // Mostrar la alerta de error
      alert('Por favor, completa todos los campos requeridos.');
      this.form.reset();
    }
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
