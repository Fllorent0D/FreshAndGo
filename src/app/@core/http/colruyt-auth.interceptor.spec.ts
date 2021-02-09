import { TestBed } from '@angular/core/testing';

import { ColruytAuthInterceptor } from './colruyt-auth.interceptor';

describe('ColruytAuthInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [ColruytAuthInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: ColruytAuthInterceptor = TestBed.inject(ColruytAuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
