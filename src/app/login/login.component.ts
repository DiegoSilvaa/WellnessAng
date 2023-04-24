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

  constructor(private authService: AuthServiceService, private router: Router) { }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.authService.login(this.form.get('username')?.value, this.form.get('password')?.value)) {
      console.log(`${this.form.get('username')?.value} ----- ${this.form.get('password')?.value}`);
      if (this.authService.userType === 'admin') {
        this.router.navigate(['/dashboard']);
      } else if (this.authService.userType === 'user') {
        this.router.navigate(['/home']);
      } else if (this.authService.userType === 'register') {
        this.router.navigate(['/']);
      }
    }
  }
}

