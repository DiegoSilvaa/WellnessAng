import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarAdminComponent } from './side-bar-admin.component';

// Describe el componente SideBarAdminComponent
describe('SideBarAdminComponent', () => {
  let component: SideBarAdminComponent;
  let fixture: ComponentFixture<SideBarAdminComponent>;

  // Configura el entorno antes de cada prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideBarAdminComponent ]
    })
    .compileComponents();

    // Crea una instancia del componente y su entorno de prueba
    fixture = TestBed.createComponent(SideBarAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba si el componente se crea exitosamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
