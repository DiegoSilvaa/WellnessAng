import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroupDirective } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, generate, interval } from 'rxjs';

@Component({
  selector: 'app-new-aforo',
  templateUrl: './new-aforo.component.html',
  styleUrls: ['./new-aforo.component.css']
})


export class NewAforoComponent implements OnInit{
	form!: FormGroup;
	formSubmitted = false;
	minWeekdaysTime: string = '08:00';
	maxWeekdaysTime: string = '18:00';
	minWeekendTime: string = '09:00';
	maxWeekendTime: string = '20:00';	  
	private refreshInterval!: Subscription;

	constructor(private formBuilder: FormBuilder, private http: HttpClient, public dialog: MatDialog) {}
  
	ngOnInit() {
	  this.form = this.formBuilder.group({
		centro: ['', Validators.required],
		intervalo: ['', Validators.required],
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
			const confirmacion = confirm('¿Estás seguro de que deseas crear un Instalacion Deportiva?');
    		if (confirmacion) {
				const url = `http://gymcodersapivm.eastus.cloudapp.azure.com:1433/instalacion/`;
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
				this.http.post(url, formData).subscribe((response: any) => {
					  // La solicitud se ha completado exitosamente
					this.form.reset();
					console.log('La solicitud POST se ha completado exitosamente:', response);
					this.iamgen = null;
					alert('Instalacion Deportiva creada con exito.')
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

	openModal(): void {
		const dialogRef = this.dialog.open(ModalComponent);
	  
		dialogRef.afterClosed().subscribe(result => {
			this.getDeportes();
		  	console.log('El modal ha sido cerrado');
		});
	  }

	  editOption(opcion:any){
		const dialogRef = this.dialog.open(ModalComponentEdit, {
			data : opcion,
		});
	  
		dialogRef.afterClosed().subscribe(result => {
			this.getDeportes();
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

@Component({
	selector: 'app-modal',
	templateUrl: './deporte-modal.html',
	styleUrls: ['./new-aforo.component.css']
  })
  export class ModalComponent implements OnInit{
  
	constructor(
	  public dialogRef: MatDialogRef<ModalComponent>,
	  @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private http: HttpClient
	) { }
  
	closeModal(): void {
	  this.dialogRef.close();
	}

	form!: FormGroup;
	ngOnInit() {
		this.form = this.formBuilder.group({
			nombre: ['', Validators.required],
		});
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

	submit() {
		if (this.form.valid) {
			const confirmacion = confirm('¿Estás seguro de que deseas crear un Deporte?');
    		if (confirmacion) {
				const url = `http://gymcodersapivm.eastus.cloudapp.azure.com:1433/deporte`;
				console.log(this.form)
				const formData = new FormData();
				formData.append('nombre_deporte', this.form.get('nombre')?.value);
				formData.append('image', this.imagen);
				this.http.post(url, formData).subscribe((response: any) => {
					  // La solicitud se ha completado exitosamente
					this.form.reset();
					console.log('La solicitud POST se ha completado exitosamente:', response);
					this.iamgen = null;
					alert("Deporte creado existosamente");
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
  }


  @Component({
	selector: 'app-modal-edit',
	templateUrl: './deporte-modal-edit.html',
	styleUrls: ['./new-aforo.component.css']
  })
  export class ModalComponentEdit implements OnInit{
  
	constructor(
	  public dialogRef: MatDialogRef<ModalComponent>,
	  @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private http: HttpClient
	) { }
  
	closeModal(): void {
	  this.dialogRef.close();
	}

	form!: FormGroup;
	ngOnInit() {
		this.form = this.formBuilder.group({
			nombre: ['', Validators.required],
		});
	}

	// Subir Imagen 
	imagen!: File;
	iamgen: any = this.data.imagen_deporte;
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

	submit() {
		if (this.form.valid) {
			const confirmacion = confirm('¿Estás seguro de que deseas editar un Deporte?');
    		if (confirmacion) {
				const url = `http://gymcodersapivm.eastus.cloudapp.azure.com:1433/deporte/${this.data.id_deporte}`;
				console.log(this.form)
				const formData = new FormData();
				formData.append('nombre_deporte', this.form.get('nombre')?.value);
				formData.append('image', this.imagen);
				this.http.put(url, formData).subscribe((response: any) => {
					  // La solicitud se ha completado exitosamente
					this.form.reset();
					console.log('La solicitud POST se ha completado exitosamente:', response);
					this.iamgen = null;
					alert("Deporte editado existosamente");
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
  
  }

