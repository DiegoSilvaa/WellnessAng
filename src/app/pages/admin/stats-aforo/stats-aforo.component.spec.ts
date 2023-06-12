import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsAforoComponent } from './stats-aforo.component';

// Describe el componente StatsAforoComponent
describe('StatsAforoComponent', () => {
  let component: StatsAforoComponent;
  let fixture: ComponentFixture<StatsAforoComponent>;

  // Configura el entorno antes de cada prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsAforoComponent ]
    })
    .compileComponents();

    // Crea una instancia del componente y su entorno de prueba
    fixture = TestBed.createComponent(StatsAforoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba si el componente se crea exitosamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
