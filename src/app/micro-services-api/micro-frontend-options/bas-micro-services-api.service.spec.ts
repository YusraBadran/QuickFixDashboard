import { TestBed } from '@angular/core/testing';

import { BasMicroServicesApiService } from './bas-micro-services-api.service';

describe('BasMicroServicesApiService', () => {
  let service: BasMicroServicesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasMicroServicesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
