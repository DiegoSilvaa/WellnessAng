import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaGymComponent } from './tabla-gym.component';

// Describe el componente TabalGymComponent
describe('TablaGymComponent', () => {
  let component: TablaGymComponent;
  let fixture: ComponentFixture<TablaGymComponent>;

  // Configura el entorno antes de cada prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaGymComponent ]
    })
    .compileComponents();

    // Crea una instancia del componente y su entorno de prueba
    fixture = TestBed.createComponent(TablaGymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba si el componente se crea exitosamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
