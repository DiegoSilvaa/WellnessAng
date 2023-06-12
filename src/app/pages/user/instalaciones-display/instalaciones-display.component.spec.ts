import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstalacionesDisplayComponent } from './instalaciones-display.component';

// Describe el componente InstalacionesDisplayComponent
describe('InstalacionesDisplayComponent', () => {
  let component: InstalacionesDisplayComponent;
  let fixture: ComponentFixture<InstalacionesDisplayComponent>;

  // Configura el entorno antes de cada prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstalacionesDisplayComponent ]
    })
    .compileComponents();

    // Crea una instancia del componente y su entorno de prueba
    fixture = TestBed.createComponent(InstalacionesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba si el componente se crea exitosamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
