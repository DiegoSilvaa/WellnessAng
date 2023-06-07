import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaGymComponent } from './tabla-gym.component';

describe('TablaGymComponent', () => {
  let component: TablaGymComponent;
  let fixture: ComponentFixture<TablaGymComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaGymComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaGymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
