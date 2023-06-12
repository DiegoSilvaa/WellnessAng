import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservaPageConfComponent } from './reserva-page-conf.component';

// Describe el componente ReservaPageConfComponent
describe('ReservaPageConfComponent', () => {
  let component: ReservaPageConfComponent;
  let fixture: ComponentFixture<ReservaPageConfComponent>;

  // Configura el entorno antes de cada prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservaPageConfComponent ]
    })
    .compileComponents();

    // Crea una instancia del componente y su entorno de prueba
    fixture = TestBed.createComponent(ReservaPageConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   // Prueba si el componente se crea exitosamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
