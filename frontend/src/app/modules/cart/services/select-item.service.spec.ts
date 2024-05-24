import { TestBed } from '@angular/core/testing';

import { SelectItemService } from './select-item.service';

describe('SelectItemService', () => {
  let service: SelectItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
