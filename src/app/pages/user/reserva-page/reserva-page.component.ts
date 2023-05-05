import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ReservaService } from 'src/app/services/reserva.service';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval } from 'rxjs';


@Component({
  selector: 'app-reserva-page',
  templateUrl: './reserva-page.component.html',
  styleUrls: ['./reserva-page.component.css']
})

export class ReservaPageComponent {
  constructor(private router: Router, private resService: ReservaService) { }
  
  
  selectedReserva = this.resService.selected;
  
  selected?: Date;
  
  hours = [
    { label: '10:00 am', selected: false },
    { label: '11:00 am', selected: false },
    { label: '12:00 pm', selected: false },
    { label: '1:00 pm', selected: false },
    { label: '2:00 pm', selected: false },
    { label: '3:00 pm', selected: false },
    { label: '4:00 pm', selected: false },
    { label: '5:00 pm', selected: false },
    { label: '6:00 pm', selected: false }
  ];

  toggleSelection(hour: any) {
    hour.selected = !hour.selected;
  }
}
