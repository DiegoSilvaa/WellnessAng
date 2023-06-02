import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAvisoComponent } from './crear-aviso.component';

// Describe el componente 'CrearAvisoComponent'
describe('CrearAvisoComponent', () => {
  let component: CrearAvisoComponent;
  let fixture: ComponentFixture<CrearAvisoComponent>;

  // Configura el entorno antes de cada prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearAvisoComponent ]
    })
    .compileComponents();

    // Crea una instancia del componente y su entorno de prueba
    fixture = TestBed.createComponent(CrearAvisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba si el componente se crea exitosamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
