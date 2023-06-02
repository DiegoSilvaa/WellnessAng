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

  //Checar si el username es valido acorde a sus credenciales
  login(username: string, password: string): boolean {
    this.pending = true;
    if (username === 'diego') {
      this.userType = 'user';
      this.pending = false;
      this.isLoggedIn = true;
      this.username = username;
      this.success = true;
      return true;
    } else if (username === 'alan') {
      this.userType = 'registro';
      this.pending = false;
      this.isLoggedIn = true;
      this.username = username;
      this.success = true;
      return true;
    } else if (username === 'perro'){
      this.userType = 'admin';
      this.pending = false;
      this.isLoggedIn = true;
      this.username = username;
      this.success = true;
      return true;
    }

    //Si el ususario es invalido, da error = true
    this.error = true;
    this.pending = false;
    console.log(this.error)
    return false;
  }

  //Se reinician las variables de autentificacion
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
