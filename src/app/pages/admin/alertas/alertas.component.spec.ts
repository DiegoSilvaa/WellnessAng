import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertasComponent } from './alertas.component';

// Describe el componente AlertasComponent
describe('AlertasComponent', () => {
  let component: AlertasComponent;
  let fixture: ComponentFixture<AlertasComponent>;

  // Configura el entorno antes de cada prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertasComponent ]
    })
    .compileComponents();
// Crea una instancia del componente y su entorno de prueba
    fixture = TestBed.createComponent(AlertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 // Prueba si el componente se crea exitosamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
