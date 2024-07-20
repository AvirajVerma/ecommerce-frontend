import { TestBed } from '@angular/core/testing';

import { UserDetailsResolveService } from './user-details-resolve.service';

describe('UserDetailsResolveService', () => {
  let service: UserDetailsResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDetailsResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
