import { TestBed } from '@angular/core/testing';

import { Entradas } from './entradas';

describe('Entradas', () => {
  let service: Entradas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Entradas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
