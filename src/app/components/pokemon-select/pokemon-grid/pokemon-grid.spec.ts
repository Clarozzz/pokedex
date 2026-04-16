import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonGrid } from './pokemon-grid';

describe('PokemonGrid', () => {
  let component: PokemonGrid;
  let fixture: ComponentFixture<PokemonGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
