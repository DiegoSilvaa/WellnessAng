import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarInstalacionComponent } from './editar-instalacion.component';

// Describe el componente EditarInstalacionComponent
describe('EditarInstalacionComponent', () => {
  let component: EditarInstalacionComponent;
  let fixture: ComponentFixture<EditarInstalacionComponent>;

  // Configura el entorno antes de cada prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarInstalacionComponent ]
    })
    .compileComponents();

    // Crea una instancia del componente y su entorno de prueba
    fixture = TestBed.createComponent(EditarInstalacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

    // Prueba si el componente se crea exitosamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
