import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReservaService } from 'src/app/services/reserva.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

interface Reserva {
  id: number;
  description: string;
  image: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router, private resService: ReservaService, public dialog: MatDialog) { }
  
  progress = 75;
  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }
  
  filteredButtons1 : Reserva[] = this.resService.buttons1;
  filteredButtons2 : Reserva[] = this.resService.buttons2;
  filteredButtons3 : Reserva[] = this.resService.buttons3;
  searchQuery = '';


  filterButtons() {
    this.filteredButtons1 = this.resService.buttons1.filter(button =>
      button.description.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    this.filteredButtons2 = this.resService.buttons2.filter(button =>
      button.description.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    this.filteredButtons3 = this.resService.buttons3.filter(button =>
      button.description.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  onReservationClick(reservation: Reserva): void {
    this.resService.selectReservation(reservation);
  }
}

@Component({
  selector: 'dialog-message',
  templateUrl: 'dialog-mesaage.html',
  styleUrls: ['./home.component.css']
})
export class DialogElementsExampleDialog {
  constructor(public dialogRef: MatDialogRef<HomeComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
