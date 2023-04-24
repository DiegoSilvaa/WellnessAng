import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './can-activate.service';

describe('CanActivateService', () => {
  let service: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
