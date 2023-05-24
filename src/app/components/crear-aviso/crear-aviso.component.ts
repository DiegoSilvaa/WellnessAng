import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgxImageCompressService } from 'ngx-image-compress';
	
@Component({
  selector: 'app-crear-aviso',
  templateUrl: './crear-aviso.component.html',
  styleUrls: ['./crear-aviso.component.css']
})
export class CrearAvisoComponent implements OnInit {  
	constructor(private formBuilder: FormBuilder, private http: HttpClient, private imageCompress: NgxImageCompressService) { }
	form!: FormGroup;

	ngOnInit() {
	  this.buildForm();
	}
  
	buildForm() {
	  this.form = this.formBuilder.group({
		titulo: ['', Validators.required],
		numeroNom: ['', Validators.required],
		descripcion: ['', Validators.required],
		start: ['', Validators.required],
		end: ['', Validators.required],
	  });
	}

  submit() {
	if (this.form.valid) {
		const confirmacion = confirm('¿Estás seguro de que deseas crear una alerta?');
    	if (confirmacion) {
			const url = 'http://gymcodersapivm.eastus.cloudapp.azure.com:1433/avisos/num_nomina/admin1';
	
		    const formData = new FormData();
		    formData.append('titulo', this.form.get('titulo')?.value);
		    formData.append('contenido', this.form.get('descripcion')?.value);
		    formData.append('image', this.imagen);
		    formData.append('fecha_publicacion', this.form.get('start')?.value);
		    formData.append('fecha_inicio', this.form.get('start')?.value);
		    formData.append('fecha_fin', this.form.get('end')?.value);
			//console.log(formData)
		    this.http.post(url, formData).subscribe((response: any) => {
		          // La solicitud se ha completado exitosamente
				this.form.reset();
				this.iamgen = null;
				console.log('La solicitud POST se ha completado exitosamente:', response);
				alert("Alerta creada exitosamente")
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
	iamgen: any;
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
