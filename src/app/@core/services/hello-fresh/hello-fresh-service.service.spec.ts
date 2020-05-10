import { TestBed } from '@angular/core/testing';

import { HelloFreshService } from './hello-fresh.service';

describe('HelloFreshServiceService', () => {
  let service: HelloFreshService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelloFreshService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
