import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservaPageConfComponent } from './reserva-page-conf.component';

describe('ReservaPageConfComponent', () => {
  let component: ReservaPageConfComponent;
  let fixture: ComponentFixture<ReservaPageConfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservaPageConfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservaPageConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
