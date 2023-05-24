import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FormGroupDirective } from '@angular/forms';
import { ReservaService } from 'src/app/services/reserva.service';
@Component({
  selector: 'app-editar-centro',
  templateUrl: './editar-centro.component.html',
  styleUrls: ['./editar-centro.component.css']
})
export class EditarCentroComponent implements OnInit {
	form!: FormGroup;
	APIGen : string = 'http://gymcodersapivm.eastus.cloudapp.azure.com:1433/centro_deportivo/';
	
	isFieldInvalid(fieldName: string): boolean {
		const field = this.form.get(fieldName);
		return field?.invalid && (field?.dirty || field?.touched) || false;
	  }
	  
	  
	constructor(private formBuilder: FormBuilder, private http:HttpClient, private resSer: ReservaService ) {}
  
  
  // LLmar a centro para editar
  editCentro: any = this.resSer.centro;
  

	ngOnInit() {
	  this.form = this.formBuilder.group({
		nombre: ['', Validators.required],
		disponibilidad: ['', Validators.required],
		ubicacion: ['', Validators.required],
	  });
	}

	submit() {
		if (this.form.valid) {
			if (!this.imagen) {
				alert('Por favor, selecciona una imagen.');
				return;
			}
				const confirmacion = confirm('¿Estás seguro de que deseas editar este Centro Deportivo?');
	    		if (confirmacion) {
				console.log(this.form)
				const dispSel = this.form.get('disponibilidad')?.value;
				const dispBool = dispSel === 'Habilitado';
				const url = `http://gymcodersapivm.eastus.cloudapp.azure.com:1433/centro_deportivo/${this.editCentro.id_centro_deportivo}`;
		
				const formData = new FormData();
				formData.append('nombre', this.form.get('nombre')?.value);
				formData.append('ubicacion', this.form.get('ubicacion')?.value);
				formData.append('image', this.imagen);
				formData.append('esta_habilitado', dispBool.toString());
				this.http.put(url, formData).subscribe((response: any) => {
					  // La solicitud se ha completado exitosamente
					this.form.reset();
					console.log('La solicitud POST se ha completado exitosamente:', response);
					this.iamgen = null;
					alert("Centro Deportivo editado existosamente");
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
	  }

// Subir Imagen 
  imagen!: File;
  iamgen: any  = this.editCentro.imagen;
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
