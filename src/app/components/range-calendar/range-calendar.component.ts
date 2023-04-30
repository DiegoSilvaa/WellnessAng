import { Component } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();
const hoy = today.getDay();

@Component({
  selector: 'app-range-calendar',
  templateUrl: './range-calendar.component.html',
  styleUrls: ['./range-calendar.component.css']
})
export class RangeCalendarComponent {
  campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month, hoy)),
    end: new FormControl(new Date(year, month, hoy)),
  });
  campaignTwo = new FormGroup({
    start: new FormControl(new Date(year, month, hoy)),
    end: new FormControl(new Date(year, month, hoy)),
  });
}
