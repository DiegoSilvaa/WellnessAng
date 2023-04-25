import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarRegisterComponent } from './sidebar-register.component';

describe('SidebarRegisterComponent', () => {
  let component: SidebarRegisterComponent;
  let fixture: ComponentFixture<SidebarRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
