import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCentroComponent } from './new-centro.component';

describe('NewCentroComponent', () => {
  let component: NewCentroComponent;
  let fixture: ComponentFixture<NewCentroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCentroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
