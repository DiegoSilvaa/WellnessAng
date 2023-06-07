import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  constructor(private http: HttpClient) { }

  isLoggedIn = false;
  userType = '';
  username = '';
  success = false;
  pending = false;
  error = false;

  //Checar si el username es valido acorde a sus credenciales
  login(username: string, password: string): boolean {
		const url = 'http://gymcodersapivm.eastus.cloudapp.azure.com:1433/alumno/login';

    // Cuerpo de datos que enviarás en la solicitud POST
    const body = {
      "matricula": username,
      "password": password
    };

    this.http.post(url, body).subscribe(
      response => {
        console.log('Respuesta:', response);
        // Realiza acciones con la respuesta del servidor
        this.userType = 'user';
        this.isLoggedIn = true;
      },
      error => {
        console.error('Error:', error);
        // Realiza acciones en caso de error
      }
    );


    if (username === 'diego') {
      this.userType = 'user';
      this.isLoggedIn = true;
      this.username = username;
      return true;
    } else if (username === 'alan') {
      this.userType = 'registro';
      this.isLoggedIn = true;
      this.username = username;
      return true;
    } else if (username === 'perro'){
      this.userType = 'admin';
      this.isLoggedIn = true;
      this.username = username;
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
