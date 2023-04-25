import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  constructor(private authService: AuthServiceService, private router: Router) { }
  
  onSubmitLog() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
