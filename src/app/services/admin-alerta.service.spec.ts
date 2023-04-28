import { TestBed } from '@angular/core/testing';

import { AdminAlertaService } from './admin-alerta.service';

describe('AdminAlertaService', () => {
  let service: AdminAlertaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAlertaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
