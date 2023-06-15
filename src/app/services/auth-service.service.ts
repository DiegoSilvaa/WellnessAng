import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  isLoggedIn = false;
  userType = '';
  username = '';

  constructor(private http: HttpClient) {
    this.restoreAuthData();
  }

  login(username: string) {
    this.isLoggedIn = false;
    this.userType = '';

    const alumnoUrl = `http://gymcodersapivm.eastus.cloudapp.azure.com:1433/alumno/${username}`;
    const adminUrl = `http://gymcodersapivm.eastus.cloudapp.azure.com:1433/administrador/${username}`;

    this.http.get<any>(alumnoUrl).subscribe(
      alumnoResponse => {
        console.log('Respuesta alumno:', alumnoResponse.data.length);
        if (alumnoResponse.data.length === 0) {
          this.http.get<any>(adminUrl).subscribe(
            adminResponse => {
              if (adminResponse.data.length !== 0) {
                console.log('Respuesta admin:', adminResponse);
                this.userType = 'admin';
                this.isLoggedIn = true;
                this.username = username;
                this.saveAuthData(); // Guarda los datos de autenticación en localStorage
                return;
              }
            },
            adminError => {
              console.error('Error admin:', adminError);
              return;
            }
          );
        } else if (alumnoResponse.data.length !== 0){
          this.userType = 'user';
          this.isLoggedIn = true;
          this.username = username;
          this.saveAuthData(); // Guarda los datos de autenticación en localStorage
          return;
        } else {
          console.error('Error alumno');
          return;
        }
      },
      alumnoError => {
        console.error('Error alumno:', alumnoError);
      }
    );
  }

  logout(): void {
    this.isLoggedIn = false;
    this.userType = '';
    this.username = '';
    this.clearAuthData(); // Elimina los datos de autenticación de localStorage
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  private saveAuthData(): void {
    localStorage.setItem('isLoggedIn', String(this.isLoggedIn));
    localStorage.setItem('userType', this.userType);
    localStorage.setItem('username', this.username);
  }

  private clearAuthData(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    localStorage.removeItem('username');
  }

  private restoreAuthData(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userType = localStorage.getItem('userType');
    const username = localStorage.getItem('username');

    if (isLoggedIn && userType && username) {
      this.isLoggedIn = isLoggedIn === 'true';
      this.userType = userType;
      this.username = username;
    }
  }
}
