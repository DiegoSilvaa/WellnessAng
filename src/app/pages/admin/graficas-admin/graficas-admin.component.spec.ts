import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficasAdminComponent } from './graficas-admin.component';

describe('GraficasAdminComponent', () => {
  let component: GraficasAdminComponent;
  let fixture: ComponentFixture<GraficasAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficasAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
