import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ReservaService } from 'src/app/services/reserva.service';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval } from 'rxjs';
import { DateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-reserva-page',
  templateUrl: './reserva-page.component.html',
  styleUrls: ['./reserva-page.component.css']
})

export class ReservaPageComponent {

  selectedReserva = this.resService.selectedInstalacion;
  selected: Date = new Date();
  initialDate!: Date;
  finalDate!: Date;
  hours: any[] = [];

  constructor(private router: Router, private resService: ReservaService, private http: HttpClient, private dateAdapter: DateAdapter<Date>) { 
    this.dateAdapter.setLocale('es'); // Opcional: establece el idioma del calendario
  }

  getHoras() {
    this.initialDate = new Date(this.selectedReserva.hora_inicial_es);
    this.finalDate = new Date(this.selectedReserva.hora_final_es);
    this.finalDate.setHours(this.finalDate.getHours() + 6);
    this.initialDate.setHours(this.initialDate.getHours() + 6); 

    // Genera el array de horas en intervalos de 1 hora
    let currentHour = this.initialDate;
    console.log(this.initialDate)
    console.log(currentHour)

    while (currentHour <= this.finalDate) {
      this.hours.push({
        label: this.formatHour(currentHour),
        selected: false,
        disabled: this.disableFecha(currentHour)
      });
      currentHour.setHours(currentHour.getHours() + 1);
    }
  }

  formatHour(date: Date): string {
    // Función auxiliar para formatear la hora en el formato deseado
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }

  disableFecha(date: Date) : boolean {
    // Obtiene la hora actual del objeto Date
    let currentDateString = new Date(date);
    return this.horasArray.some((obj:any) => {
      let newDate = new Date(obj.hora)
      newDate.setHours(newDate.getHours() + 6);
      let c1 = newDate.toLocaleTimeString();
      let c2 = currentDateString.toLocaleTimeString();
      console.log(c1, c2);
      return c1 === c2;
    })
  }


  toggleSelection(hour: any) {
    hour.selected = !hour.selected;
  }
  

  onDateSelected(): void {
    // Aquí puedes hacer lo que necesites con la fecha seleccionada
    this.hours = [];
    this.http.get<any[]>(`http://gymcodersapivm.eastus.cloudapp.azure.com:1433/instalacion/${this.selectedReserva.id_instalacion}/horarios_reservados_en_fecha/${this.selected}`)
      .subscribe((results: any) => {
        this.horasArray = Object.values(results.data);
        this.getHoras();
        console.log(this.horasArray);
      })
  }



  horasArray: any;
  confirmReservation() {
    if (!this.selected || this.hours.every(hour => !hour.selected)) {
      alert('Por favor, selecciona una fecha y hora antes de reservar.');
    } else {
      // Lógica para confirmar la reserva si se selecciona la fecha y hora
      // Redirecciona a la página de confirmación de reserva u otra acción deseada
    }
  }


  // desactivar fechas pasadas a la actual
  getDateClass = (date: Date): string => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establece la hora a las 00:00:00

    return date < today ? 'disabled-date' : '';
  };
}
