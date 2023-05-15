import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstalacionesDisplayComponent } from './instalaciones-display.component';

describe('InstalacionesDisplayComponent', () => {
  let component: InstalacionesDisplayComponent;
  let fixture: ComponentFixture<InstalacionesDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstalacionesDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstalacionesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
