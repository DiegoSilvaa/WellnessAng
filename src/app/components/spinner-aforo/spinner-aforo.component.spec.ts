import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerAforoComponent } from './spinner-aforo.component';

describe('SpinnerAforoComponent', () => {
  let component: SpinnerAforoComponent;
  let fixture: ComponentFixture<SpinnerAforoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerAforoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinnerAforoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
