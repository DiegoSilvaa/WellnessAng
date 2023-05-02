import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsAforoComponent } from './stats-aforo.component';

describe('StatsAforoComponent', () => {
  let component: StatsAforoComponent;
  let fixture: ComponentFixture<StatsAforoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsAforoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsAforoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
