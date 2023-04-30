import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReservaService } from 'src/app/services/reserva.service';
import { MatTableDataSource } from '@angular/material/table';

interface Persona {
  nombre: string;
}

@Component({
  selector: 'app-reserva-page-conf',
  templateUrl: './reserva-page-conf.component.html',
  styleUrls: ['./reserva-page-conf.component.css']
})
export class ReservaPageConfComponent {
  constructor(private router: Router, private resService: ReservaService) { }
  selectedReserva = this.resService.selected;


  nuevoNombre: string = '';
  dataSource = new MatTableDataSource<Persona>([]);
  columnas = ['nombre', 'acciones'];

  agregarPersona() {
    if (this.nuevoNombre.trim()) {
      this.dataSource.data.push({ nombre: this.nuevoNombre });
      this.dataSource.data = [...this.dataSource.data];
      this.nuevoNombre = '';
    }
  }

  eliminarPersona(persona: Persona) {
    console.log('pendejo')
    const index = this.dataSource.data.indexOf(persona);
    if (index >= 0) {
      this.dataSource.data.splice(index, 1);
      this.dataSource.data = [...this.dataSource.data];
    }
  }
}
