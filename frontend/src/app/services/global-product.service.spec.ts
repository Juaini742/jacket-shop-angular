import { TestBed } from '@angular/core/testing';

import { GlobalProductService } from './global-product.service';

describe('GlobalProductService', () => {
  let service: GlobalProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
