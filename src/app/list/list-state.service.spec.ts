import { TestBed } from '@angular/core/testing';

import { ListStateService } from './list-state.service';

describe('FilterStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListStateService = TestBed.get(ListStateService);
    expect(service).toBeTruthy();
  });
});
