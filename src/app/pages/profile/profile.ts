import { Component, signal } from '@angular/core';
import { UserProfile } from '../../types/UserProfile';
import { Router } from '@angular/router';
import { Loading } from '../../components/loading/loading';
import { TrainerProfile } from '../../components/profile/trainer-profile/trainer-profile';

@Component({
  selector: 'app-profile',
  imports: [Loading, TrainerProfile],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  loading = signal(false)
  user = signal<UserProfile | undefined>(undefined)
  pokemons = signal<any[]>([])

  constructor(private router: Router) { }

  ngOnInit() {
    this.loading.set(true)

    const userData = localStorage.getItem('user_data')
    const userPokemons = localStorage.getItem('pokemons')

    if (!userData) {
      this.router.navigate(['/'])
      return;
    }

    if (!userPokemons) {
      this.router.navigate(['/select-pokemons'])
      return;
    }

    this.user.set(JSON.parse(userData))
    this.pokemons.set(JSON.parse(userPokemons))

    this.loading.set(false)

  }
}
