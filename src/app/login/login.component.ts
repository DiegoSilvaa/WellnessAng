import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username = '';
  password = '';
  alertStatusP : boolean = false;
  alertStatusS : boolean = false;
  alertStatusE : boolean = false;
  constructor(private authService: AuthServiceService, private router: Router) { }
  
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  access : boolean = false;
  submit() {

    // PROBAR ESTA FUNCIONALIDAD CUANDO ESTE LISTA EL BACKEND
    this.access = this.authService.login(this.form.get('username')?.value, this.form.get('password')?.value)
    this.alertStatusE = this.authService.error;
    this.alertStatusP = this.authService.pending;
    this.alertStatusS = this.authService.success;
    if (this.access) {
      console.log(`${this.form.get('username')?.value} ----- ${this.form.get('password')?.value}`);
      if (this.authService.userType === 'admin') {
        this.router.navigate(['/dashboard']);
      } else if (this.authService.userType === 'user') {
        this.router.navigate(['/home']);
      } else if (this.authService.userType === 'registro') {
        this.router.navigate(['/registroModulo']);
      }
    }
  }
}

