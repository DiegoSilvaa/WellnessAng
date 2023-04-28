import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAvisoComponent } from './editar-aviso.component';

describe('EditarAvisoComponent', () => {
  let component: EditarAvisoComponent;
  let fixture: ComponentFixture<EditarAvisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarAvisoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarAvisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
