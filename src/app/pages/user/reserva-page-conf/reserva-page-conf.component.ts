import { Component } from '@angular/core';
interface Persona {
  nombre: string;
}

@Component({
  selector: 'app-reserva-page-conf',
  templateUrl: './reserva-page-conf.component.html',
  styleUrls: ['./reserva-page-conf.component.css']
})
export class ReservaPageConfComponent {
  personas: Persona[] = [];
  nuevoNombre: string = '';
  columnas: string[] = ['nombre', 'acciones'];
  dataSource: Persona[] = this.personas;

  agregarPersona() {
    const persona: Persona = { nombre: this.nuevoNombre };
    this.personas.push(persona);
    this.dataSource = [...this.personas];
    this.nuevoNombre = '';
  }

  eliminarPersona(persona: Persona) {
    const index = this.personas.indexOf(persona);
    if (index >= 0) {
      this.personas.splice(index, 1);
      this.dataSource = [...this.personas];
    }
  }
}
