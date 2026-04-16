import { Component, computed, inject, input, signal } from '@angular/core';
import { UserProfile } from '../../../types/UserProfile';
import { Router } from '@angular/router';
import { Authservice } from '../../../services/auth/authservice';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-grid',
  imports: [TitleCasePipe],
  templateUrl: './pokemon-grid.html',
  styleUrl: './pokemon-grid.scss',
})
export class PokemonGrid {
  authService = inject(Authservice)

  user = input<UserProfile>()
  pokemons = input<any[]>([])
  selectedIds = signal<number[]>([]);
  searchTerm = signal('')

  isButtonDisabled = computed(() => this.selectedIds().length !== 3)

  ngOnInit() {
    this.loadSelectedPokemons()
  }

  private loadSelectedPokemons() {
    const savedPokemons = localStorage.getItem('pokemons');
    if (savedPokemons) {
      const data = JSON.parse(savedPokemons);
      const ids = data.map((p: any) => p.id);
      this.selectedIds.set(ids);
    }
  }

  constructor(private router: Router) {}

  filteredPokemons = computed(() => {
    const query = this.searchTerm().toLowerCase();
    return this.pokemons().filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.id.toString().includes(query)
    );
  });

  togglePokemon(id: number) {
    const current = this.selectedIds();

    if (current.includes(id)) {
      this.selectedIds.set(current.filter(pId => pId !== id));
    } else if (current.length < 3) {
      this.selectedIds.set([...current, id]);
    }
  }

  isMaxedOut(id: number): boolean {
    return this.selectedIds().length >= 3 && !this.selectedIds().includes(id);
  }

  filterPokemon(event: Event) {
    const value = (event.target as HTMLInputElement).value
    this.searchTerm.set(value)
  }

  onSubmit() {
    if (this.selectedIds().length === 3) {
      const selectedPokemons = this.pokemons().filter(p => {
        return this.selectedIds().includes(p.id)
      })

      localStorage.setItem('pokemons', JSON.stringify(selectedPokemons))
      localStorage.setItem('registered', JSON.stringify(true))

      const userData = JSON.parse(localStorage.getItem('user_data') || '{}')
      this.authService.updateSession(userData)

      this.router.navigate(['/profile'])

    }
  }
}
