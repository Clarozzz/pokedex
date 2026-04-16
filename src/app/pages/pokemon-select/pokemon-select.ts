import { Component, inject, signal } from '@angular/core';
import { Pokemons } from '../../services/pokemons';
import { Loading } from "../../components/loading/loading";
import { Router } from '@angular/router';
import { PokemonGrid } from "../../components/pokemon-select/pokemon-grid/pokemon-grid";
import { UserProfile } from '../../types/UserProfile';

@Component({
  selector: 'app-pokemon-select',
  imports: [Loading, PokemonGrid],
  templateUrl: './pokemon-select.html',
  styleUrl: './pokemon-select.scss',
})
export class PokemonSelect {
  loading = signal(false)
  pokemonService = inject(Pokemons)
  pokemonList = signal<any[]>([]);
  user = signal<UserProfile | undefined>(undefined)

  constructor(private router: Router) {}

  async ngOnInit() {
    this.loading.set(true)

    const savedData = localStorage.getItem('user_data')

    if (!savedData) {
      this.router.navigate(['/'])
      return;
    }

    this.user.set(JSON.parse(savedData))

    try {
      const data = await this.pokemonService.getFullPokemons(9)
      this.pokemonList.set(data)
    } catch (error) {
      console.error("Error fetching pokemons")
    } finally {
      setTimeout(() => {
        this.loading.set(false)
      }, 500);
    }
  }
}
