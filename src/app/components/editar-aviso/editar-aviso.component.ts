import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AdminAlertaService } from 'src/app/services/admin-alerta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-aviso',
  templateUrl: './editar-aviso.component.html',
  styleUrls: ['./editar-aviso.component.css']
})
export class EditarAvisoComponent {

  constructor(private router: Router, private alertaService: AdminAlertaService) { }
  currNot = this.alertaService.selectedAlerta

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
