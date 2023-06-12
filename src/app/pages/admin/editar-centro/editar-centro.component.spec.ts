import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCentroComponent } from './editar-centro.component';

// Describe el componente EditarCentroComponent
describe('EditarCentroComponent', () => {
  let component: EditarCentroComponent;
  let fixture: ComponentFixture<EditarCentroComponent>;

  // Configura el entorno antes de cada prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCentroComponent ]
    })
    .compileComponents();

    // Crea una instancia del componente y su entorno de prueba
    fixture = TestBed.createComponent(EditarCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba si el componente se crea exitosamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
