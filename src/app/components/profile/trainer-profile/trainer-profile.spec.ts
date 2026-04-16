import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerProfile } from './trainer-profile';

describe('TrainerProfile', () => {
  let component: TrainerProfile;
  let fixture: ComponentFixture<TrainerProfile>;

  const userData = {
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
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    sprites: { front_default: 'image.jpeg' },
    types: [{ type: { name: 'grass' } }],
    stats: [{ base_stat: 45, stat: {name: "hp"} }]
  }]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerProfile],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainerProfile);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('userData', userData)
    fixture.componentRef.setInput('pokemons', mockList)

    fixture.detectChanges()

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate stat percentage correctly', () => {
    // hp: 45 / 255 * 100 = 17.64
    const percentage = component.getStatPercentage('hp', 45)
    expect(percentage).toBeCloseTo(17.64, 1)

    // Test value
    const defaultPercentage = component.getStatPercentage('test', 50)
    expect(defaultPercentage).toBe(50)
  })

  it('should translate stat names correctly', () => {
    expect(component.translateStat('attack')).toBe('Ataque')
    expect(component.translateStat('special-attack')).toBe('Ataque Especial')
    expect(component.translateStat('speed')).toBe('Velocidad')

    // Test value
    expect(component.translateStat('test')).toBe('test')
  })
});
