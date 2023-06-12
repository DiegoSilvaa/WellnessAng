import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficasAdminComponent } from './graficas-admin.component';

// Describe el componente GraficasAdminComponent
describe('GraficasAdminComponent', () => {
  let component: GraficasAdminComponent;
  let fixture: ComponentFixture<GraficasAdminComponent>;

    // Configura el entorno antes de cada prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficasAdminComponent ]
    })
    .compileComponents();

    // Crea una instancia del componente y su entorno de prueba
    fixture = TestBed.createComponent(GraficasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

    // Prueba si el componente se crea exitosamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
