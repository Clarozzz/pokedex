import { TestBed } from '@angular/core/testing';

import { Pokemons } from './pokemons';

describe('Pokemons', () => {
  let service: Pokemons;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pokemons);

    vi.restoreAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getch API data', async () => {
    const mockListResponse = {
      results: [
        {
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon/1/'
        }
      ]
    }

    const mockDetailResponse = {
      id: 1,
      name: 'bulbasaur',
      sprites: { front_default: 'image.jpeg' },
      types: [{ type: { name: 'grass' } }],
      stats: [{ base_stat: 45 }]
    }

    const fetchMock = vi.fn().mockResolvedValueOnce({
      json: async () => mockListResponse
    }).mockResolvedValueOnce({
      json: async () => mockDetailResponse
    })

    vi.stubGlobal('fetch', fetchMock)

    const result = await service.getFullPokemons(1)

    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(result).toHaveLength(1)
    expect(result[0]).toEqual({
      id: 1,
      name: 'bulbasaur',
      image: 'image.jpeg',
      types: ['grass'],
      stats: mockDetailResponse.stats
    })

  })
});
