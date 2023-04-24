import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  isLoggedIn = false;
  userType = '';
  username = '';

  login(username: string, password: string): boolean {
    if (username === 'diego') {
      this.userType = 'user';
    } else if (username === 'alan') {
      this.userType = 'registro';
    } else if (username === 'perro'){
      this.userType = 'admin';
    }

    if (password === '1234') {
      this.isLoggedIn = true;
      this.username = username;
      return true;
    }
    return false;
  }

  logout(): void {
    this.isLoggedIn = false;
    this.userType = '';
  }
}
