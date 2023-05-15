import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-crear-aviso',
  templateUrl: './crear-aviso.component.html',
  styleUrls: ['./crear-aviso.component.css']
})
export class CrearAvisoComponent {
  
  titulo = ""
  asunto = ""
  fecha = ""
  descripcion = ""


  form: FormGroup = new FormGroup({
    titulo : new FormControl(''),
    asunto : new FormControl(''),
    fecha : new FormControl(''),
    descripcion : new FormControl(''),
  });

  submit() {
    console.log(this.form.value)
  }

   // Subir Imagen
  //url; //Angular 8
	url: any; //Angular 11, for stricter type
	msg = "";
	
	//selectFile(event) { //Angular 8
	selectFile(event: any) { //Angular 11, for stricter type
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
