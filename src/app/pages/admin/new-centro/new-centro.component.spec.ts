import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCentroComponent } from './new-centro.component';


// Describe el componente NewCentroComponent
describe('NewCentroComponent', () => {
  let component: NewCentroComponent;
  let fixture: ComponentFixture<NewCentroComponent>;

  // Configura el entorno antes de cada prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCentroComponent ]
    })
    .compileComponents();

// Crea una instancia del componente y su entorno de prueba
    fixture = TestBed.createComponent(NewCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba si el componente se crea exitosamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
