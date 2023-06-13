import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-spinner-aforo',
  templateUrl: './spinner-aforo.component.html',
  styleUrls: ['./spinner-aforo.component.css']
})


export class SpinnerAforoComponent implements OnInit {
  
  API : string = 'http://gymcodersapivm.eastus.cloudapp.azure.com:1433/gimnasio';
  gimnasio: any;
  aforo: any;

  constructor(private http: HttpClient) { 
    this.gimnasio = [];
  }
  private refreshInterval!: Subscription;

  ngOnInit() {
    this.http.get<any[]>(this.API).subscribe((results: any) => {
      this.gimnasio = results.data[0];
      this.aforo = Math.trunc((this.gimnasio.aforo_actual/this.gimnasio.aforo_maximo) * 100)
      console.log(results.data[0])
    });

    this.refreshInterval = interval(1000).subscribe(() => {
      this.http.get<any[]>(this.API).subscribe((results: any) => {
        this.gimnasio = results.data[0];
        this.aforo = Math.trunc((this.gimnasio.aforo_actual/this.gimnasio.aforo_maximo) * 100)
        //console.log(results.data[0])
      });
    });
  }

  ngOnDestroy() {
    if (this.refreshInterval) {
      this.refreshInterval.unsubscribe();
    }
  }
}
