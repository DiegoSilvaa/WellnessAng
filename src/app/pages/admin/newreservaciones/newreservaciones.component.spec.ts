import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewreservacionesComponent } from './newreservaciones.component';

describe('NewreservacionesComponent', () => {
  let component: NewreservacionesComponent;
  let fixture: ComponentFixture<NewreservacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewreservacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewreservacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
