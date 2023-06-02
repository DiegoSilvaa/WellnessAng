import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerAforoComponent } from './spinner-aforo.component';

// Describe el componente SpinnerAforoComponent
describe('SpinnerAforoComponent', () => {
  let component: SpinnerAforoComponent;
  let fixture: ComponentFixture<SpinnerAforoComponent>;

  // Configura el entorno antes de cada prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerAforoComponent ]
    })
    .compileComponents();

    // Crea una instancia del componente y su entorno de prueba
    fixture = TestBed.createComponent(SpinnerAforoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba si el componente se crea exitosamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
