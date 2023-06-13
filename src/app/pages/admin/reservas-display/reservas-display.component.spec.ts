import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasDisplayComponent } from './reservas-display.component';

// Describe el componente ReservasDisplayComponent
describe('ReservasDisplayComponent', () => {
  let component: ReservasDisplayComponent;
  let fixture: ComponentFixture<ReservasDisplayComponent>;

  // Configura el entorno antes de cada prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservasDisplayComponent ]
    })
    .compileComponents();

    // Crea una instancia del componente y su entorno de prueba
    fixture = TestBed.createComponent(ReservasDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba si el componente se crea exitosamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
