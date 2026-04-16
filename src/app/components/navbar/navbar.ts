import { Component, inject, signal } from '@angular/core';
import { UserProfile } from '../../types/UserProfile';
import { Authservice } from '../../services/auth/authservice';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  authService = inject(Authservice)

  isRegistered = this.authService.isRegistered
  user = this.authService.user
}
