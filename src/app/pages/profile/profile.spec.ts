import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Profile } from './profile';
import { UserProfile } from '../../types/UserProfile';
import { Router } from '@angular/router';

describe('Profile', () => {
  let component: Profile;
  let fixture: ComponentFixture<Profile>;
  let mockRouter = { navigate: vi.fn() };

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
    stats: [{ base_stat: 45 }]
  }]

  beforeEach(async () => {
    vi.clearAllMocks();
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [Profile],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Profile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect home if no user data in localStorage', () => {
    fixture.detectChanges()

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/'])
  })

  it('should redirect to select pokemon if no pokemon data in localStorage', async () => {
    localStorage.setItem('user_data', JSON.stringify(mockUser))

    component.ngOnInit();
    fixture.detectChanges()
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/select-pokemons'])
  })

  it('should set user and pokemon data', () => {
    localStorage.setItem('user_data', JSON.stringify(mockUser))
    localStorage.setItem('pokemons', JSON.stringify(mockList))

    component.ngOnInit();

    expect(component.user()).toEqual(mockUser)
    expect(component.pokemons()).toEqual(mockList)
    expect(component.loading()).toBe(false)
  })

});
