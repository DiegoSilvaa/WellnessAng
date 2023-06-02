import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarRegisterComponent } from './sidebar-register.component';

// Describe el componente SideBarRegisterComponent
describe('SidebarRegisterComponent', () => {
  let component: SidebarRegisterComponent;
  let fixture: ComponentFixture<SidebarRegisterComponent>;

  // Configura el entorno antes de cada prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarRegisterComponent ]
    })
    .compileComponents();

    // Crea una instancia del componente y su entorno de prueba
    fixture = TestBed.createComponent(SidebarRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba si el componente se crea exitosamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
