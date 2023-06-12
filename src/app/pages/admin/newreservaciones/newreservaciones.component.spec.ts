import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewreservacionesComponent } from './newreservaciones.component';

// Describe el componente NewReservacionesComponent
describe('NewreservacionesComponent', () => {
  let component: NewreservacionesComponent;
  let fixture: ComponentFixture<NewreservacionesComponent>;

  // Configura el entorno antes de cada prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewreservacionesComponent ]
    })
    .compileComponents();

    // Crea una instancia del componente y su entorno de prueba
    fixture = TestBed.createComponent(NewreservacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba si el componente se crea exitosamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
