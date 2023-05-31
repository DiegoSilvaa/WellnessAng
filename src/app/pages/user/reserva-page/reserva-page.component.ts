import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ReservaService } from 'src/app/services/reserva.service';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval } from 'rxjs';
import { DateAdapter } from '@angular/material/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reserva-page',
  templateUrl: './reserva-page.component.html',
  styleUrls: ['./reserva-page.component.css']
})

export class ReservaPageComponent implements OnInit{

  selectedReserva = this.resService.selectedInstalacion;
  selected: Date = new Date();
  initialDate!: Date;
  finalDate!: Date;
  constructor(private router: Router, private resService: ReservaService, private http: HttpClient,private formBuilder: FormBuilder) {}

  form!: FormGroup;
  ngOnInit(): void {
      this.getCalificacion();
      this.onDateSelected();
      this.form = this.formBuilder.group({
        hora: ['', Validators.required],
        cantidad: ['', [Validators.required, Validators.min(1), Validators.max(20)]]
      });
  }

  hora: any;
  toggleSelection(hour: any) {
    hour.selected = !hour.selected;
    this.hora = hour.label;
  }
  
  horasArray: any[] = [];
  onDateSelected(): void {
    // Aquí puedes hacer lo que necesites con la fecha seleccionada
    console.log(this.selected);
    this.http.get<any[]>(`http://gymcodersapivm.eastus.cloudapp.azure.com:1433/instalacion/${this.selectedReserva.id_instalacion}/get_horarios_disponibles/fecha/${this.selected}`)
      .subscribe((results: any[]) => {
        this.horasArray = results;
        console.log(results);
  
        for (let i = 0; i < this.horasArray.length; i++) {
          const fecha = new Date(this.horasArray[i].hora);
          fecha.setHours(fecha.getHours() + 6);
          
          const horas = fecha.getHours();
          const minutos = fecha.getMinutes();
          const segundos = fecha.getSeconds();
          const horaCompleta = horas.toString().padStart(2, '0') + ':' + minutos.toString().padStart(2, '0') + ':' + segundos.toString().padStart(2, '0');
          
          this.horasArray[i].hora = horaCompleta;
        }
      });
  }

  // Calificacion de Una Instalacion
  calificacion:any;
  getCalificacion() {
    this.http.get<any[]>(`http://gymcodersapivm.eastus.cloudapp.azure.com:1433/calificacion_instalacion/${this.selectedReserva.id_instalacion}/calificacion_promedio`)
    .subscribe((results: any) => {
      this.calificacion = results.data;
      console.log(results.data);
    });
  }
  



  confirmReservation() {
    if (this.form.valid) {
      console.log(this.form)
			const confirmacion = confirm('¿Estás seguro de que deseas Reservar este Instalacion?');
      if (confirmacion) {
        const url = `http://gymcodersapivm.eastus.cloudapp.azure.com:1433/reservacion/matricula/A00832361/instalacion/${this.selectedReserva.id_instalacion}`;
				console.log(this.form)
        console.log(this.selected)
				const formData = new FormData();
				formData.append('fecha', this.selected.toDateString());
				formData.append('hora', this.form.get('hora')?.value);
				formData.append('cantidad_personas',this.form.get('cantidad')?.value);

        const data = {
          'fecha' : this.selected,
          'hora' : this.form.get('hora')?.value,
          'cantidad_personas': this.form.get('cantidad')?.value,
        }

				this.http.post(url, data).subscribe((response: any) => {
					  // La solicitud se ha completado exitosamente
					this.form.reset();
					console.log('La solicitud POST se ha completado exitosamente:', response);
          alert('Reservaste esta instalacion con exito.')
				},
					(error) => {
					  // Se produjo un error al realizar la solicitud
					  console.error('Error al realizar la solicitud POST:', error);
            alert('Error en la Reserva.')
					}
        );
      }
    } else {
      alert("Completa los Campos Requeridos.")
    }
  }
}
