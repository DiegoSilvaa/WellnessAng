import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionConfComponent } from './notificacion-conf.component';

// Describe el componente InstalacionesDisplayComponent
describe('NotificacionConfComponent', () => {
  let component: NotificacionConfComponent;
  let fixture: ComponentFixture<NotificacionConfComponent>;

  // Configura el entorno antes de cada prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificacionConfComponent ]
    })
    .compileComponents();

    // Crea una instancia del componente y su entorno de prueba
    fixture = TestBed.createComponent(NotificacionConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba si el componente se crea exitosamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
