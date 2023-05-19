import { Component, OnInit, ViewChild } from '@angular/core';
import { TableUtil } from 'src/app/components/export';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-modulo',
  templateUrl: './registro-modulo.component.html',
  styleUrls: ['./registro-modulo.component.css']
})

export class RegistroModuloComponent implements OnInit{
  
  API : string = 'http://gymcodersapivm.eastus.cloudapp.azure.com:1433/registro_gimnasio';
  registro: any;
  registroArray: any;
  form!: FormGroup;
  private refreshInterval!: Subscription;
  constructor(private http: HttpClient, private formBuilder: FormBuilder) { 
    this.registro = [];
  }
  
  ngOnInit() {
    this.form = this.formBuilder.group({
  		aforoMax: ['', Validators.required],
  		aforoActual: ['', Validators.required],
	  });
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
    TableUtil.exportTableToExcel("MaterialTable");
  }

  exportNormalTable() {
    TableUtil.exportTableToExcel("MaterialTable");
  }
  
  
  // Cambiar Aforo

  guardarCambios() {
    if (this.form.valid) {
		  // El formulario es válido, puedes continuar con el procesamiento
		  console.log(this.form.value);
      this.form.reset();
		} else {
		  // Mostrar la alerta de error
		  alert('Por favor, completa todos los campos requeridos.');
		}
  }


}
