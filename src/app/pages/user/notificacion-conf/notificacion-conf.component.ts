import { Component } from '@angular/core';
import { NotService } from 'src/app/services/not.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notificacion-conf',
  templateUrl: './notificacion-conf.component.html',
  styleUrls: ['./notificacion-conf.component.css']
})
export class NotificacionConfComponent {
  constructor(private notServie: NotService, private router: Router) { }
  
  not = this.notServie.selectedReservation;

}
