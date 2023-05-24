import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroupDirective } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ReservaService } from 'src/app/services/reserva.service';
@Component({
  selector: 'app-editar-instalacion',
  templateUrl: './editar-instalacion.component.html',
  styleUrls: ['./editar-instalacion.component.css']
})
export class EditarInstalacionComponent implements OnInit{
	form!: FormGroup;
	formSubmitted = false;
	minWeekdaysTime: string = '08:00';
	maxWeekdaysTime: string = '18:00';
	minWeekendTime: string = '09:00';
	maxWeekendTime: string = '20:00';	  
  // LLmar a centro para editar
  editIns: any = this.resSer.instalacionStats;

	constructor(private formBuilder: FormBuilder, private http: HttpClient, private resSer: ReservaService) {}
  
	ngOnInit() {
	  this.form = this.formBuilder.group({
		centro: ['', Validators.required],
		nombre: ['', Validators.required],
		deporte: ['', Validators.required],
		weekdaysStartTime: ['', Validators.required],
		weekdaysEndTime: ['', Validators.required],
		weekendStartTime: ['', Validators.required],
		weekendEndTime: ['', Validators.required]
	  });

	  this.getCentros();
	  this.getDeportes();
	}

	submit() {
		if (this.form.valid) {
			const url = `http://gymcodersapivm.eastus.cloudapp.azure.com:1433/instalacion/${this.editIns.id_instalacion}`;
			console.log(this.form)
			const formData = new FormData();
			formData.append('id_deporte', this.form.get('deporte')?.value);
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
			},
				(error) => {
				  // Se produjo un error al realizar la solicitud
				  console.error('Error al realizar la solicitud POST:', error);
				}
			  );
		  } else {
			alert('Por favor, completa todos los campos requeridos.');
		}	
	  }

	centros: any;
	getCentros() {
		const url = `http://gymcodersapivm.eastus.cloudapp.azure.com:1433/centro_deportivo/`;
		this.http.get<any[]>(url).subscribe((results: any) => { 
			this.centros = results.data;
			console.log(results.data)
		})
	}

	deportes:any;
	getDeportes() {
		const url = `http://gymcodersapivm.eastus.cloudapp.azure.com:1433/deporte`;
		this.http.get<any[]>(url).subscribe((results: any) => { 
			this.deportes = results.data;
			console.log(results.data)
		})
	}

	  

	// Subir Imagen 
	imagen!: File;
	iamgen: any = this.editIns.imagen;
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
}
