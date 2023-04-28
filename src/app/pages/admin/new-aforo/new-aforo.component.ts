import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-aforo',
  templateUrl: './new-aforo.component.html',
  styleUrls: ['./new-aforo.component.css']
})
export class NewAforoComponent {
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
}