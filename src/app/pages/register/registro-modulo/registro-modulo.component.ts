import { Component, OnInit, ViewChild } from '@angular/core';
import { TableUtil } from 'src/app/components/export';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval } from 'rxjs';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-registro-modulo',
  templateUrl: './registro-modulo.component.html',
  styleUrls: ['./registro-modulo.component.css']
})

export class RegistroModuloComponent implements OnInit{
  
  API : string = 'http://gymcodersapivm.eastus2.cloudapp.azure.com:1433/registro_gimnasio';
  registro: any;
  registroArray: any;
  private refreshInterval!: Subscription;
  constructor(private http: HttpClient) { 
    this.registro = [];
  }


  

  ngOnInit() {
    this.getRegistro();
    this.refreshInterval = interval(10000).subscribe(() => {
      this.getRegistro();
    });
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


}
