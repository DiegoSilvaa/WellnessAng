import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminAlertaService } from 'src/app/services/admin-alerta.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editar-aviso',
  templateUrl: './editar-aviso.component.html',
  styleUrls: ['./editar-aviso.component.css']
})
export class EditarAvisoComponent {

  constructor(private router: Router, private alertaService: AdminAlertaService, private http: HttpClient,private formBuilder: FormBuilder) { }
  currNot = this.alertaService.selectedReservation; // Propiedad para almacenar la reserva seleccionada

  form!: FormGroup; // Propiedad para almacenar el formulario

	ngOnInit() {
	  	this.buildForm(); // Llamar al método para construir el formulario
    	console.log(this.currNot);
	}
  
	buildForm() {
		// Construir el formulario usando el FormBuilder
	  this.form = this.formBuilder.group({
		titulo: [this.currNot.titulo, Validators.required],
		numeroNom: [this.currNot.num_nomina, Validators.required],
		descripcion: [this.currNot.contenido, Validators.required],
		start: [this.currNot.fecha_inicio, Validators.required],
		end: [this.currNot.fecha_fin, Validators.required],
	  });
	}

  submit() {
	if (this.form.valid) {
		const confirmacion = confirm('¿Estás seguro de que deseas editar esta alerta?');
    	if (confirmacion) {
			const url = `http://gymcodersapivm.eastus.cloudapp.azure.com:1433/avisos/${this.currNot.id_aviso}`;
			console.log(this.imagen)
		    const formData = new FormData();
		    formData.append('titulo', this.form.get('titulo')?.value);
		    formData.append('contenido', this.form.get('descripcion')?.value);
		    formData.append('image', this.imagen);
		    formData.append('fecha_publicacion', this.form.get('start')?.value);
		    formData.append('fecha_inicio', this.form.get('start')?.value);
		    formData.append('fecha_fin', this.form.get('end')?.value);
			console.log(formData);
		    this.http.put(url, formData).subscribe((response: any) => {
		          // La solicitud se ha completado exitosamente
				this.form.reset();
				console.log('La solicitud POST se ha completado exitosamente:', response);
				this.iamgen = null;
				alert("Alerta editada exitosamente")
			},
		        (error) => {
		          // Se produjo un error al realizar la solicitud
		          console.error('Error al realizar la solicitud POST:', error);
		        }
		      );
			} else {
				return;
			}
	  } else {
		alert('Por favor, completa todos los campos requeridos.');
	}	
	}

   // Subir Imagen
   imagen!: File;
   iamgen: any = this.currNot.imagen;
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
