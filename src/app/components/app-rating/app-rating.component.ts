import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-app-rating',
  templateUrl: './app-rating.component.html',
  styleUrls: ['./app-rating.component.css']
})
export class AppRatingComponent {
  @Input() rating: number = 3;

  //la propiedad maxRating es una arreglo de numero que representa la maxima calificacion
  maxRating: number[] = [1, 2, 3, 4, 5];
}
