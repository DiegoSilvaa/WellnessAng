import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionConfComponent } from './notificacion-conf.component';

describe('NotificacionConfComponent', () => {
  let component: NotificacionConfComponent;
  let fixture: ComponentFixture<NotificacionConfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificacionConfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificacionConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
