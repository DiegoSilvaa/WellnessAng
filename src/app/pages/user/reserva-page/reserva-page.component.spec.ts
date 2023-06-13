import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaPageComponent } from './reserva-page.component';

// Describe el componente ReservaPageComponent
describe('ReservaPageComponent', () => {
  let component: ReservaPageComponent;
  let fixture: ComponentFixture<ReservaPageComponent>;

  // Configura el entorno antes de cada prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservaPageComponent ]
    })
    .compileComponents();

// Crea una instancia del componente y su entorno de prueba
    fixture = TestBed.createComponent(ReservaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba si el componente se crea exitosamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
