import { TestBed } from '@angular/core/testing';

import { Authservice } from './authservice';
import { UserProfile } from '../../types/UserProfile';

describe('Authservice', () => {
  let service: Authservice;

  const mockUser: UserProfile = {
    name: 'Juan',
    hobby: 'Jugar Videojuegos',
    birthdate: '2006-02-02',
    age: 20,
    profileImage: 'image.jpeg',
    fileName: 'image.jpeg'
  };

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    service = TestBed.inject(Authservice);

    expect(service).toBeTruthy();
  });

  it('should start with default values', () => {
    service = TestBed.inject(Authservice);
    expect(service.isRegistered()).toBe(false)
    expect(service.user()).toBeUndefined();
  })

  it('should retrieve session form localStorage', () => {
    localStorage.setItem('registered', 'true')
    localStorage.setItem('user_data', JSON.stringify(mockUser))

    service = TestBed.inject(Authservice);

    expect(service.isRegistered()).toBe(true)
    expect(service.user()).toEqual(mockUser)
  })

  it('should update user session', () => {
    service = TestBed.inject(Authservice);
    service.updateSession(mockUser)

    expect(service.isRegistered()).toBe(true)
    expect(service.user()).toEqual(mockUser)
  })

  it('should check session', () => {
    service = TestBed.inject(Authservice);

    localStorage.setItem('registered', 'true');
    localStorage.setItem('user_data', JSON.stringify(mockUser));
    service.checkSession()

    expect(service.isRegistered()).toBe(true)
    expect(service.user()).toEqual(mockUser)
  })

});
