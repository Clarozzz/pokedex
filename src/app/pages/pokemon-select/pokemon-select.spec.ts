import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { PokemonSelect } from './pokemon-select';
import { Router } from '@angular/router';
import { Pokemons } from '../../services/pokemons';
import { UserProfile } from '../../types/UserProfile';

describe('PokemonSelect', () => {
  let component: PokemonSelect;
  let fixture: ComponentFixture<PokemonSelect>;
  let mockRouter = { navigate: vi.fn() };
  let mockPokemonService = { getFullPokemons: vi.fn() };

  const mockUser: UserProfile = {
    name: 'Juan',
    hobby: 'Jugar Videojuegos',
    birthdate: '2006-02-02',
    age: 20,
    profileImage: 'image.jpeg',
    fileName: 'image.jpeg'
  };

  const mockList = [{
    id: 1,
    name: 'bulbasaur',
    sprites: { front_default: 'image.jpeg' },
    types: [{ type: { name: 'grass' } }],
    stats: [{ base_stat: 45, stat: { name: "hp" } }]
  }]

  beforeEach(async () => {
    vi.clearAllMocks();
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [PokemonSelect],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: Pokemons, useValue: mockPokemonService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonSelect);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title', async () => {
    component.loading.set(false)

    fixture.detectChanges()

    await fixture.whenStable()
    fixture.detectChanges()

    const compiled = fixture.nativeElement as HTMLElement;
    const titleElement = compiled.querySelector('.title')

    expect(titleElement).toBeTruthy();

    expect(titleElement?.textContent.trim()).toContain('¡Ya casi términamos!')
  })

  it('should contain the pokemon grid component', async () => {
    component.loading.set(false)

    fixture.detectChanges()

    await fixture.whenStable()
    fixture.detectChanges()

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-pokemon-grid')).not.toBeNull();
  })

  it('should redirect if no data found in localStorage', async () => {
    fixture.detectChanges()

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/'])
  })

  it('should load pokemons if user exists in localStorage', async () => {

    localStorage.setItem('user_data', JSON.stringify(mockUser))
    mockPokemonService.getFullPokemons.mockResolvedValue(mockList);

    await component.ngOnInit();

    expect(component.user()).toEqual(mockUser);
    expect(component.pokemonList()).toEqual(mockList);
    expect(component.loading()).toBe(false);

  })

  it('should manage errors on pokemons loading', async () => {
    localStorage.setItem('user_data', JSON.stringify(mockUser))
    mockPokemonService.getFullPokemons.mockRejectedValue(new Error("API Error"))

    await component.ngOnInit();

    expect(component.loading()).toBe(false)
    expect(component.pokemonList()).toEqual([])
  })

});
