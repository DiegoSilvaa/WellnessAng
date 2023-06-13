import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroupDirective } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, generate, interval } from 'rxjs';
import { ModalComponent } from '../new-aforo/new-aforo.component';
import { ModalComponentEdit } from '../new-aforo/new-aforo.component';
import { ReservaService } from 'src/app/services/reserva.service';
@Component({
  selector: 'app-editar-instalacion',
  templateUrl: './editar-instalacion.component.html',
  styleUrls: ['./editar-instalacion.component.css']
})

export class EditarInstalacionComponent implements OnInit {
	form!: FormGroup;
	formSubmitted = false;
	public hoursMap = [
		{ value: '00:00:00', label: '12:00 AM' },
		{ value: '00:30:00', label: '12:30 AM' },
		{ value: '01:00:00', label: '01:00 AM' },
		{ value: '01:30:00', label: '01:30 AM' },
		{ value: '02:00:00', label: '02:00 AM' },
		{ value: '02:30:00', label: '02:30 AM' },
		{ value: '03:00:00', label: '03:00 AM' },
		{ value: '03:30:00', label: '03:30 AM' },
		{ value: '04:00:00', label: '04:00 AM' },
		{ value: '04:30:00', label: '04:30 AM' },
		{ value: '05:00:00', label: '05:00 AM' },
		{ value: '05:30:00', label: '05:30 AM' },
		{ value: '06:00:00', label: '06:00 AM' },
		{ value: '06:30:00', label: '06:30 AM' },
		{ value: '07:00:00', label: '07:00 AM' },
		{ value: '07:30:00', label: '07:30 AM' },
		{ value: '08:00:00', label: '08:00 AM' },
		{ value: '08:30:00', label: '08:30 AM' },
		{ value: '09:00:00', label: '09:00 AM' },
		{ value: '09:30:00', label: '09:30 AM' },
		{ value: '10:00:00', label: '10:00 AM' },
		{ value: '10:30:00', label: '10:30 AM' },
		{ value: '11:00:00', label: '11:00 AM' },
		{ value: '11:30:00', label: '11:30 AM' },
		{ value: '12:00:00', label: '12:00 PM' },
		{ value: '12:30:00', label: '12:30 PM' },
		{ value: '13:00:00', label: '01:00 PM' },
		{ value: '13:30:00', label: '01:30 PM' },
		{ value: '14:00:00', label: '02:00 PM' },
		{ value: '14:30:00', label: '02:30 PM' },
		{ value: '15:00:00', label: '03:00 PM' },
		{ value: '15:30:00', label: '03:30 PM' },
		{ value: '16:00:00', label: '04:00 PM' },
		{ value: '16:30:00', label: '04:30 PM' },
		{ value: '17:00:00', label: '05:00 PM' },
		{ value: '17:30:00', label: '05:30 PM' },
		{ value: '18:00:00', label: '06:00 PM' },
		{ value: '18:30:00', label: '06:30 PM' },
		{ value: '19:00:00', label: '07:00 PM' },
		{ value: '19:30:00', label: '07:30 PM' },
		{ value: '20:00:00', label: '08:00 PM' },
		{ value: '20:30:00', label: '08:30 PM' },
		{ value: '21:00:00', label: '09:00 PM' },
		{ value: '21:30:00', label: '09:30 PM' },
		{ value: '22:00:00', label: '10:00 PM' },
		{ value: '22:30:00', label: '10:30 PM' },
		{ value: '23:00:00', label: '11:00 PM' },
		{ value: '23:30:00', label: '11:30 PM' }
	]	  
	private refreshInterval!: Subscription;


	constructor(private formBuilder: FormBuilder, private http: HttpClient, public dialog: MatDialog, private resSer: ReservaService) {}
  
  currInst: any = this.resSer.instalacionStats;
	ngOnInit() {
	  this.form = this.formBuilder.group({
		centro: [this.currInst.id_centro_deportivo, Validators.required],
		nombre: [this.currInst.nombre, Validators.required],
		deporte: [this.currInst.id_deporte, Validators.required],
		intervalo: [this.currInst.id_intervalo, Validators.required],
		weekdaysStartTime: [this.currInst.hora_inicial_es, Validators.required],
		weekdaysEndTime: [this.currInst.hora_final_es, Validators.required],
		weekendStartTime: [this.currInst.hora_inicial_fds, Validators.required],
		weekendEndTime: [this.currInst.hora_final_fds, Validators.required]
	  });

	  this.getCentros();
	  this.getDeportes();
	  this.refreshInterval = interval(100000).subscribe(() => {
		this.getCentros();
		this.getDeportes();
	  });
	}

	submit() {
		if (this.form.valid) {
      const confirmacion = confirm('¿Estás seguro de que deseas editar esta Instalacion Deportiva?');
    		if (confirmacion) {
  			const url = `http://gymcodersapivm.eastus.cloudapp.azure.com:1433/instalacion/${this.currInst.id_instalacion}`;
  			console.log(this.form)
  			const formData = new FormData();
  			formData.append('id_deporte', this.form.get('deporte')?.value);
			formData.append('id_intervalo', this.form.get('intervalo')?.value);
  			formData.append('nombre', this.form.get('nombre')?.value);
  			formData.append('id_centro_deportivo', this.form.get('centro')?.value);
  			formData.append('image', this.imagen);
  			formData.append('hora_inicial_es',this.form.get('weekdaysStartTime')?.value);
  			formData.append('hora_final_es', this.form.get('weekdaysEndTime')?.value);
  			formData.append('hora_inicial_fds', this.form.get('weekendStartTime')?.value);
  			formData.append('hora_final_fds', this.form.get('weekendEndTime')?.value);
  			this.http.put(url, formData).subscribe((response: any) => {
  				  // La solicitud se ha completado exitosamente
  				this.form.reset();
  				console.log('La solicitud POST se ha completado exitosamente:', response);
  				this.iamgen = null;
          alert("Instalacion Deportiva editada con exito.")
  			},
  				(error) => {
  				  // Se produjo un error al realizar la solicitud
  				  console.error('Error al realizar la solicitud POST:', error);
  				}
  			  );
  		  } 
      } else {
			alert('Por favor, completa todos los campos requeridos.');
		}	
  }

	centros: any;
	getCentros() {
		const url = `http://gymcodersapivm.eastus.cloudapp.azure.com:1433/centro_deportivo/`;
		this.http.get<any[]>(url).subscribe((results: any) => { 
			this.centros = results.data;
			//console.log(results.data)
		})
	}

	deportes:any;
	getDeportes() {
		const url = `http://gymcodersapivm.eastus.cloudapp.azure.com:1433/deporte`;
		this.http.get<any[]>(url).subscribe((results: any) => { 
			this.deportes = results.data;
			//console.log(results.data)
		})
	}

	  

	// Subir Imagen 
	imagen!: File;
	iamgen: any = this.currInst.imagen;
	msg = "";
	selectFile(event: any) { 
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		this.imagen = event.target.files[0];
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
			this.imagen = event.target.files[0]; 
			this.iamgen = reader.result; 
			console.log(this.imagen)
		}
	}

	openModal(): void {
		const dialogRef = this.dialog.open(ModalComponent);
	  
		dialogRef.afterClosed().subscribe(result => {
		  console.log('El modal ha sido cerrado');
		});
	  }

	  editOption(opcion:any){
		const dialogRef = this.dialog.open(ModalComponentEdit, {
			data : opcion,
		});
	  
		dialogRef.afterClosed().subscribe(result => {
		  console.log('El modal ha sido cerrado');
		});
	  }

	  deleteOption(opcion:any) {
		this.http.get(`http://gymcodersapivm.eastus.cloudapp.azure.com:1433/deporte/${opcion.id_deporte}/tiene_instalaciones?`)
      .subscribe((response: any) => {
        console.log(response)
		if (response.data[0].tiene_instalaciones === false) {
			this.http.delete(`http://gymcodersapivm.eastus.cloudapp.azure.com:1433/deporte/${opcion.id_deporte}`).subscribe((response:any) =>{
				console.log(response);
			})
		} else {
			alert("El deporte tiene Instalaciones Activas no se puede eliminar.")
		}
		}, (error) => {
		// Manejar errores si la eliminación falla
		alert("El deporte tiene Instalaciones Activas no se puede eliminar.")
		});
	  }
}