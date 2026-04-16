import { Routes } from '@angular/router';
import { Register } from './pages/register/register';
import { PokemonSelect } from './pages/pokemon-select/pokemon-select';
import { Profile } from './pages/profile/profile';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: Register
  }, {
    path: 'select-pokemons',
    component: PokemonSelect
  }, {
    path: 'profile',
    component: Profile
  }
];
