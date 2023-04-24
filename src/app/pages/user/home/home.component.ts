import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) { }

  progress = 75;

  // CENTRO DEPORTIVO 1
  buttons1 = [
    { id: 1, description: 'Boton 1.1', image: '../../../../assets/centro1.png', action: () => this.router.navigate(['/reservaPage']) },
    { id: 2, description: 'Boton 1.2', image: '../../../../assets/centro1.png', action: () => this.router.navigate(['/reservaPage']) },
    { id: 3, description: 'Boton 1.3', image: '../../../../assets/centro1.png', action: () => this.router.navigate(['/reservaPage']) },
    { id: 4, description: 'Boton 1.4', image: '../../../../assets/centro1.png', action: () => this.router.navigate(['/reservaPage']) },
    { id: 5, description: 'Boton 1.5', image: '../../../../assets/centro1.png', action: () => this.router.navigate(['/reservaPage']) },
    { id: 6, description: 'Boton 1.6', image: '../../../../assets/centro1.png', action: () => this.router.navigate(['/reservaPage']) },
    { id: 7, description: 'Boton 1.7', image: '../../../../assets/centro1.png', action: () => this.router.navigate(['/reservaPage']) },
    { id: 8, description: 'Boton 1.8', image: '../../../../assets/centro1.png', action: () => this.router.navigate(['/reservaPage']) },
    { id: 9, description: 'Boton 1.9', image: '../../../../assets/centro1.png', action: () => this.router.navigate(['/reservaPage']) },
    { id: 10, description: 'Boton 1.10', image: '../../../../assets/centro1.png', action: () => this.router.navigate(['/reservaPage']) },
    { id: 11, description: 'Boton 1.11', image: '../../../../assets/centro1.png', action: () => this.router.navigate(['/reservaPage']) },
    { id: 12, description: 'Boton 1.12', image: '../../../../assets/centro1.png', action: () => this.router.navigate(['/reservaPage']) },
  ];

  // CENTRO DEPORTIVO 2

  buttons2 = [
    { id: 4, description: 'Boton 2.1', image: '../../../../assets/centro2.png', action: () => console.log('Botón 2.1 presionado') },
    { id: 5, description: 'Boton 2.2', image: '../../../../assets/centro2.png', action: () => console.log('Botón 2.2 presionado') },
    { id: 6, description: 'Boton 2.3', image: '../../../../assets/centro2.png', action: () => console.log('Botón 2.3 presionado') },
  ];

  // WELLNESS CENTER 

  buttons3 = [
    { id: 7, description: 'Boton 3.1', image: '../../../../assets/wellness.png', action: () => console.log('Botón 3.1 presionado') },
    { id: 8, description: 'Boton 3.2', image: '../../../../assets/wellness.png', action: () => console.log('Botón 3.2 presionado') },
    { id: 9, description: 'Boton 3.3', image: '../../../../assets/wellness.png', action: () => console.log('Botón 3.3 presionado') },
  ];

  filteredButtons1 = this.buttons1;
  filteredButtons2 = this.buttons2;
  filteredButtons3 = this.buttons3;
  searchQuery = '';


  filterButtons() {
    this.filteredButtons1 = this.buttons1.filter(button =>
      button.description.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    this.filteredButtons2 = this.buttons2.filter(button =>
      button.description.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    this.filteredButtons3 = this.buttons3.filter(button =>
      button.description.toLowerCase().includes(this.searchQuery.toLowerCase())
    );


  }
}
