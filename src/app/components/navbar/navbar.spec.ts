import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Navbar } from './navbar';
import { UserProfile } from '../../types/UserProfile';
import { signal } from '@angular/core';
import { Authservice } from '../../services/auth/authservice';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;
  const mockIsRegistered = signal(false);
  const mockUser = signal<UserProfile | undefined>(undefined);

  const mockAuthService = {
    isRegistered: mockIsRegistered,
    user: mockUser
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [
        { provide: Authservice, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show user data when registered', () => {
    const userData = {
      name: 'Juan',
      hobby: 'Jugar Videojuegos',
      birthdate: '2006-02-02',
      age: 20,
      profileImage: 'image.jpeg',
      fileName: 'image.jpeg'
    };
    mockIsRegistered.set(true)
    mockUser.set(userData)

    fixture.detectChanges()

    expect(component.isRegistered()).toBe(true)
    expect(component.user()).toEqual(userData)
  })

  it('should not show user if not registered', () => {
    mockIsRegistered.set(false);
    mockUser.set(undefined);

    fixture.detectChanges();

    expect(component.isRegistered()).toBe(false);
  });

});
