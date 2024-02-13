import { TestBed } from '@angular/core/testing';

import { SecuredAdminService } from './secured-admin.service';

describe('SecuredAdminService', () => {
  let service: SecuredAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecuredAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
