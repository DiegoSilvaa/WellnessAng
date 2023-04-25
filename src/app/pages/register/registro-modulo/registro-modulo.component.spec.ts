import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroModuloComponent } from './registro-modulo.component';

describe('RegistroModuloComponent', () => {
  let component: RegistroModuloComponent;
  let fixture: ComponentFixture<RegistroModuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroModuloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroModuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
