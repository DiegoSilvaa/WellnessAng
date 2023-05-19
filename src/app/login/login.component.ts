import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // Mostrar Visibilidad del Password
  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  form!: FormGroup;

  constructor(private authService: AuthServiceService, private router: Router, private formBuilder: FormBuilder) { }
  
  ngOnInit() {
	  this.form = this.formBuilder.group({
  		username: ['', Validators.required],
  		password: ['', Validators.required],
	  });
	}

  access : boolean = false;
  submit() {

    // PROBAR ESTA FUNCIONALIDAD CUANDO ESTE LISTA EL BACKEND
    this.access = this.authService.login(this.form.get('username')?.value, this.form.get('password')?.value)
    if (this.access) {
      console.log(`${this.form.get('username')?.value} ----- ${this.form.get('password')?.value}`);
      if (this.authService.userType === 'admin') {
        this.router.navigate(['/dashboard']);
      } else if (this.authService.userType === 'user') {
        this.router.navigate(['/home']);
      } else if (this.authService.userType === 'registro') {
        this.router.navigate(['/registroModulo']);
      }
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }
}

