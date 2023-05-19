import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservaService } from 'src/app/services/reserva.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-reserva-page-conf',
  templateUrl: './reserva-page-conf.component.html',
  styleUrls: ['./reserva-page-conf.component.css']
})
export class ReservaPageConfComponent implements OnInit{
  constructor(private router: Router, private resService: ReservaService, private formBuilder: FormBuilder) { }
  selectedReserva = this.resService.selected;
  
  form!: FormGroup;
  
  ngOnInit() {
	  this.form = this.formBuilder.group({
  		nombre: ['', Validators.required],
	  });
	}

  dataSource = new MatTableDataSource<any>([]);
  columnas = ['nombre', 'acciones'];

  agregarNombre() {
    if (this.form.valid) {
      const nombre = this.form.get('nombre')?.value;
      this.dataSource.data.push({ nombre });
      this.dataSource.data = [...this.dataSource.data];
      this.form.reset();
    }
  }

  eliminarNombre(index: number) {
    this.dataSource.data.splice(index, 1);
    this.dataSource.data = [...this.dataSource.data];
  }

  submit() {
    if (this.dataSource.data.length > 0) {
      this.router.navigate(["/home"])
    } else {
        alert('Por favor, ingresa al menos un nombre.')
    }
  }

}
