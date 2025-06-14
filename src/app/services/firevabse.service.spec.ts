import { TestBed } from '@angular/core/testing';

import { FirevabseService } from './firevabse.service';

describe('FirevabseService', () => {
  let service: FirevabseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirevabseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
