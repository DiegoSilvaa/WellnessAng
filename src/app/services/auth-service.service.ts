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


  login(username: string) {
    this.isLoggedIn = false;
    this.userType = '';

    const alumnoUrl = `http://gymcodersapivm.eastus.cloudapp.azure.com:1433/alumno/${username}`;
    const adminUrl = `http://gymcodersapivm.eastus.cloudapp.azure.com:1433/administrador/${username}`;
  
    this.http.get<any>(alumnoUrl).subscribe(
      alumnoResponse => {
        console.log('Respuesta alumno:', alumnoResponse.data.length);
        // Verifica si el array de respuesta está vacío
        if (alumnoResponse.data.length === 0) {
          // Intenta consultar la URL de administrador
          this.http.get<any>(adminUrl).subscribe(
            adminResponse => {
              if (adminResponse.data.length !== 0) {
                console.log('Respuesta admin:', adminResponse);
                // Realiza acciones con la respuesta del servidor
                this.userType = 'admin';
                this.isLoggedIn = true;
                this.username = username;
                console.log(this.userType, this.isLoggedIn)
                return;
              }
            },
            adminError => {
              console.error('Error admin:', adminError);
              // Realiza acciones en caso de error
              return;
            }
          );
        } else if (alumnoResponse.data.length !== 0){
          this.userType = 'user';
          this.isLoggedIn = true;
          this.username = username;
          return;
        } else {
          console.error('Error alumno');
          return;
        }
      },
      alumnoError => {
        console.error('Error alumno:', alumnoError);
        // Realiza acciones en caso de error
      }
    );
  }
  
  
  
  
  //Se reinician las variables de autentificacion
  logout(): void {
    this.isLoggedIn = false;
    this.userType = '';
    this.username = '';
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
