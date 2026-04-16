import { Injectable, signal } from '@angular/core';
import { UserProfile } from '../../types/UserProfile';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  user = signal<UserProfile | undefined>(undefined)
  isRegistered = signal(false)

  constructor() {
    this.checkSession()
  }

  checkSession() {
    const registered = localStorage.getItem('registered');
    const userData = localStorage.getItem('user_data');

    if (registered && userData) {
      this.isRegistered.set(true);
      this.user.set(JSON.parse(userData));
    }
  }

  updateSession(userData: UserProfile) {
    this.user.set(userData);
    this.isRegistered.set(true);
  }
  
}
