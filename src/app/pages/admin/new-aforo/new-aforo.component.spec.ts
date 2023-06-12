import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAforoComponent } from './new-aforo.component';

// Describe el componente NewAforoComponent
describe('NewAforoComponent', () => {
  let component: NewAforoComponent;
  let fixture: ComponentFixture<NewAforoComponent>;

  // Configura el entorno antes de cada prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAforoComponent ]
    })
    .compileComponents();

    // Crea una instancia del componente y su entorno de prueba
    fixture = TestBed.createComponent(NewAforoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba si el componente se crea exitosamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
