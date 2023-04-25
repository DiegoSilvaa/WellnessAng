import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-sidebar-register',
  templateUrl: './sidebar-register.component.html',
  styleUrls: ['./sidebar-register.component.css']
})
export class SidebarRegisterComponent {
  constructor(private authService: AuthServiceService, private router: Router) { }
  
  onSubmitLog() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
