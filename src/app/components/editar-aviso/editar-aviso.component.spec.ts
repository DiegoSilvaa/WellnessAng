import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAvisoComponent } from './editar-aviso.component';

//Describe el componente EditarAvisoComponent
describe('EditarAvisoComponent', () => {
  let component: EditarAvisoComponent;
  let fixture: ComponentFixture<EditarAvisoComponent>;

  // Configura el entorno antes de cada prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarAvisoComponent ]
    })
    .compileComponents();

    // Crea una instancia del componente y su entorno de prueba
    fixture = TestBed.createComponent(EditarAvisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba si el componente se crea exitosamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
