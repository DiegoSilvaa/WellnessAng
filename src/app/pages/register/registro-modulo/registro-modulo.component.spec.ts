import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroModuloComponent } from './registro-modulo.component';

// Describe el componente RegistroModuloComponent
describe('RegistroModuloComponent', () => {
  let component: RegistroModuloComponent;
  let fixture: ComponentFixture<RegistroModuloComponent>;

  // Configura el entorno antes de cada prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroModuloComponent ]
    })
    .compileComponents();

     // Crea una instancia del componente y su entorno de prueba
    fixture = TestBed.createComponent(RegistroModuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba si el componente se crea exitosamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
