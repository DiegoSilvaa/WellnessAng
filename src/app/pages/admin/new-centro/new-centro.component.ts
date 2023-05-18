import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroupDirective } from '@angular/forms';
@Component({
  selector: 'app-new-centro',
  templateUrl: './new-centro.component.html',
  styleUrls: ['./new-centro.component.css']
})
export class NewCentroComponent implements OnInit{
	form!: FormGroup;
	formSubmitted = false;
	minWeekdaysTime: string = '08:00';
	maxWeekdaysTime: string = '18:00';
	minWeekendTime: string = '09:00';
	maxWeekendTime: string = '20:00';

	isFieldInvalid(fieldName: string): boolean {
		const field = this.form.get(fieldName);
		return field?.invalid && (field?.dirty || field?.touched) || false;
	  }
	  
	  
	constructor(private formBuilder: FormBuilder) {}
  
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
	}

	submit() {
		this.formSubmitted = true;
		if (this.form.valid) {
		  // El formulario es válido, puedes continuar con el procesamiento
		  console.log(this.form.value);
		} else {
		  // Mostrar la alerta de error
		  alert('Por favor, completa todos los campos requeridos.');
		}
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
