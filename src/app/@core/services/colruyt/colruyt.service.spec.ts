import { TestBed } from '@angular/core/testing';

import { ColruytService } from './colruyt.service';

describe('ColruytService', () => {
  let service: ColruytService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColruytService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
