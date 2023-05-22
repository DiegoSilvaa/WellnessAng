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
		const url = ' http://gymcodersapivm.eastus.cloudapp.azure.com:1433/avisos';
	  	const data = {
			"num_nomina": this.form.get('numeroNom')?.value,
			"titulo": this.form.get('titulo')?.value,
			"contenido": this.form.get('descripcion')?.value,
			"imagen": this.iamgen,
			"fecha_publicacion": this.form.get('start')?.value,
			"fecha_inicio": this.form.get('start')?.value,
			"fecha_fin": this.form.get('end')?.value
		};
	
		this.http.post(url, data).subscribe(
		  response => {
			console.log(response);
			this.form.reset();
		  },
		  error => {
			console.error(error);
		  }
		);
	} else {
		alert('Por favor, completa todos los campos requeridos.');
	}
  }

   // Subir Imagen
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
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
			this.iamgen = reader.result; 
			console.log(this.iamgen)
		}
	}
}
