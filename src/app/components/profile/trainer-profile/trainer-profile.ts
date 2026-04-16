import { Component, input } from '@angular/core';
import { UserProfile } from '../../../types/UserProfile';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-trainer-profile',
  imports: [TitleCasePipe],
  templateUrl: './trainer-profile.html',
  styleUrl: './trainer-profile.scss',
})
export class TrainerProfile {
  userData = input.required<UserProfile>();
  pokemons = input.required<any[]>();

  getStatPercentage(statName: string, value: number): number {
    const maxStats: { [key: string]: number } = {
      'hp': 255,
      'attack': 190,
      'defense': 230,
      'special-attack': 194,
      'special-defense': 230,
      'speed': 180
    };

    const max = maxStats[statName] || 100;
    return (value / max) * 100;
  }

  translateStat(statName: string): string {
    const names: { [key: string]: string } = {
      'hp': 'HP',
      'attack': 'Ataque',
      'defense': 'Defensa',
      'special-attack': 'Ataque Especial',
      'special-defense': 'Defensa Especial',
      'speed': 'Velocidad'
    };
    return names[statName] || statName;
  }
}
