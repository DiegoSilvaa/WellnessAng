import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

// Describe el componente LoginComponent
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  // Configura el entorno antes de cada prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();

        // Crea una instancia del componente y su entorno de prueba
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

    // Prueba si el componente se crea exitosamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
