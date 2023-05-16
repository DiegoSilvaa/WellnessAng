import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crear-aviso',
  templateUrl: './crear-aviso.component.html',
  styleUrls: ['./crear-aviso.component.css']
})
export class CrearAvisoComponent {
  
	constructor(private http: HttpClient) { }


  titulo = ""
  numeroNom = ""
  fecha = ""
  descripcion = ""


  form: FormGroup = new FormGroup({
    titulo : new FormControl(''),
    numeroNom : new FormControl(''),
    fecha : new FormControl(''),
    descripcion : new FormControl(''),
  });

  submit() {
	//console.log(typeof(this.form.get('numeroNom')?.value), typeof(this.form.get('titulo')?.value), typeof(this.form.get('descripcion')?.value), typeof(this.form.get('fecha')?.value))
	const url = ' http://gymcodersapivm.eastus2.cloudapp.azure.com:1433/avisos';
  	const data = {
		"num_nomina": this.form.get('numeroNom')?.value,
		"titulo": this.form.get('titulo')?.value,
		"contenido": this.form.get('descripcion')?.value,
		"imagen": this.url,
		"fecha_publicacion": this.form.get('fecha')?.value,
		"fecha_inicio": "2023-02-05T06:00:00.000Z",
		"fecha_fin": "2023-02-05T06:00:00.000Z"
	};

	this.http.post(url, data).subscribe(
	  response => {
		console.log(response);
	  },
	  error => {
		console.error(error);
	  }
	);
  }
  

   // Subir Imagen
	url: any;
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
			this.url = reader.result; 
		}
	}
}
