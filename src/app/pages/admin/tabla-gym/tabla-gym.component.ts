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
  API : string = 'http://gymcodersapivm.eastus.cloudapp.azure.com:1433/registro_gimnasio/hoy';
  searchQuery = '';
  registro: any;
  registroArray: any;
  filteredDataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  form!: FormGroup;
  displayedColumns = ['id_registro', 'matricula', 'fecha'];
  private refreshInterval!: Subscription;
  constructor(private http: HttpClient, private formBuilder: FormBuilder) { 
    this.registro = [];
    this.filteredDataSource = new MatTableDataSource();
  }
  
  ngOnInit() {
    this.form = this.formBuilder.group({
  		aforoMax: ['', Validators.required],
  		aforoActual: ['', Validators.required],
	  });
    this.getRegistro();
  }

  getRegistro() {
    this.http.get<any[]>(this.API).subscribe((results: any) => {
      this.registro = Object.values(results.data);
      console.log(this.registro)
      this.registroArray = Array.isArray(this.registro) ? this.registro : [this.registro];
      this.filteredDataSource = new MatTableDataSource(this.registroArray);
      this.filteredDataSource.paginator = this.paginator; // Mover la asignación del paginador aquí
    });
  }
  
  
  // Exportar tablas de Registro a Excel
  exportTable() {
    TableUtil.exportTableToExcel("MaterialTable");
  }


  filterButtons(selectedDate: any) {
  }
}
