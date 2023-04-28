import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  isLoggedIn = false;
  userType = '';
  username = '';
  success = false;
  pending = false;
  error = false;

  login(username: string, password: string): boolean {
    this.pending = true;
    if (username === 'diego') {
      this.userType = 'user';
    } else if (username === 'alan') {
      this.userType = 'registro';
    } else if (username === 'perro'){
      this.userType = 'admin';
    }

    if (password === '1234') {
      this.pending = false;
      this.isLoggedIn = true;
      this.username = username;
      this.success = true;
      return true;
    }
    this.error = true;
    this.pending = false;
    console.log(this.error)
    return false;
  }

  logout(): void {
    this.isLoggedIn = false;
    this.userType = '';
    this.username = '';
    this.pending = false;
    this.success = false;
    this.error = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
