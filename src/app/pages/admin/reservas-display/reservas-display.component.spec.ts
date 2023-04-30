import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasDisplayComponent } from './reservas-display.component';

describe('ReservasDisplayComponent', () => {
  let component: ReservasDisplayComponent;
  let fixture: ComponentFixture<ReservasDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservasDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservasDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
