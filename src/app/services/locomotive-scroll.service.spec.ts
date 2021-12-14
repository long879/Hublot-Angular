import { TestBed } from '@angular/core/testing';

import { LocomotiveScrollService } from './locomotive-scroll.service';

describe('LocomotiveScrollService', () => {
  let service: LocomotiveScrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocomotiveScrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
