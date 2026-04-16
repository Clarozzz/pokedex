import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonGrid } from './pokemon-grid';
import { Authservice } from '../../../services/auth/authservice';
import { Router } from '@angular/router';

describe('PokemonGrid', () => {
  let component: PokemonGrid;
  let fixture: ComponentFixture<PokemonGrid>;

  const mockAuthService = { updateSession: vi.fn() };
  const mockRouter = { navigate: vi.fn() };

  const userData = {
    name: 'Juan',
    hobby: 'Jugar Videojuegos',
    birthdate: '2006-02-02',
    age: 20,
    profileImage: 'image.jpeg',
    fileName: 'image.jpeg'
  };

  const mockPokemons = [
    { id: 1, name: 'bulbasaur' },
    { id: 2, name: 'charmander' },
    { id: 3, name: 'squirtle' },
    { id: 4, name: 'pikachu' }
  ];

  beforeEach(async () => {
    localStorage.clear();
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [PokemonGrid],
      providers: [
        { provide: Authservice, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonGrid);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('pokemons', mockPokemons);
    fixture.componentRef.setInput('user', userData)

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter pokemons based on search term', () => {
    component.searchTerm.set('bul')

    const filtered = component.filteredPokemons()
    expect(filtered.length).toBe(1)
    expect(filtered[0].name).toBe('bulbasaur')
  })

  it('should toggle pokemon selection (up to 3)', () => {
    component.togglePokemon(1)
    component.togglePokemon(2)
    component.togglePokemon(3)

    
    // Attempt to toggle a fourth pokemon
    component.togglePokemon(4)
    
    // Capped at 3
    expect(component.selectedIds().length).toBe(3)

    // Verification with isMaxedOut()
    expect(component.isMaxedOut(4)).toBe(true)
    expect(component.isMaxedOut(1)).toBe(false)

    
    expect(component.isButtonDisabled()).toBe(false)
  })

  it('should save data and navigate on submit', () => {
    localStorage.setItem('user_data', JSON.stringify(userData))

    component.selectedIds.set([1, 2, 3])
    fixture.detectChanges()

    component.onSubmit()

    expect(localStorage.getItem('registered')).toBe("true")
    expect(mockAuthService.updateSession).toHaveBeenCalledWith(userData)
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/profile'])
  })

  it('should load pokemons from localStorage on initialization', () => {
    const selected = [
      { id: 1, name: 'bulbasaur' },
      { id: 2, name: 'charmander' },
    ]

    localStorage.setItem('pokemons', JSON.stringify(selected))

    component.ngOnInit()

    expect(component.selectedIds()).toEqual([1, 2])
    expect(component.isButtonDisabled()).toBe(true)
  })

});
