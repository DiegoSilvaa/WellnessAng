import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAforoComponent } from './new-aforo.component';

describe('NewAforoComponent', () => {
  let component: NewAforoComponent;
  let fixture: ComponentFixture<NewAforoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAforoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAforoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
