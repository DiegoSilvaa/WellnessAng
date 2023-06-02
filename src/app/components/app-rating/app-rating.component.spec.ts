import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRatingComponent } from './app-rating.component';

// Describe el componente AppRatingComponent
describe('AppRatingComponent', () => {
  let component: AppRatingComponent;
  let fixture: ComponentFixture<AppRatingComponent>;

  // Configura el entorno antes de cada prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppRatingComponent ]
    })
    .compileComponents();

    // Crea una instancia del componente y su entorno de prueba
    fixture = TestBed.createComponent(AppRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba si el componente se crea exitosamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
