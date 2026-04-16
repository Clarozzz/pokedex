import { TestBed } from '@angular/core/testing';

import { Pokemons } from './pokemons';

describe('Pokemons', () => {
  let service: Pokemons;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pokemons);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
