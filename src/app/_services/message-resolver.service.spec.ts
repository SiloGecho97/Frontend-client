import { TestBed } from '@angular/core/testing';

import { MessageResolverService } from './message-resolver.service';

describe('MessageResolverService', () => {
  let service: MessageResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
