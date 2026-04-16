import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Pokemons {

  async getFullPokemons(quantity: number = 9) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${quantity}`);
    const listData = await res.json();

    const pokemonDetails = await Promise.all(
      listData.results.map(async (p: any) => {
        const detailsRes = await fetch(p.url);
        const details = await detailsRes.json();

        return {
          id: details.id,
          name: details.name,
          image: details.sprites.front_default,
          types: details.types.map((t: any) => t.type.name),
          stats: details.stats
        };
      })
    );

    return pokemonDetails;
  }
}
