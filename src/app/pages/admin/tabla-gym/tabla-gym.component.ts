import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-tabla-gym',
  templateUrl: './tabla-gym.component.html',
  styleUrls: ['./tabla-gym.component.css'],
})

export class TablaGymComponent implements OnInit {
  API : string = 'http://gymcodersapivm.eastus.cloudapp.azure.com:1433/registro_gimnasio/hoy';
  registro: any;
  registroArray: any;
  filteredDataSource:MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns = ['id_registro', 'matricula', 'fecha'];
  
  constructor(private http: HttpClient, private formBuilder: FormBuilder) { 
    this.registro = [];
    this.filteredDataSource = new MatTableDataSource<any>();
  }


  ngOnInit() {
    this.getRegistro()
  }
  
  filteredArray:any;
  getRegistro() {
    this.http.get<any[]>(this.API).subscribe((results: any) => {
      this.registro = Object.values(results.data);
      this.registroArray = Array.isArray(this.registro) ? this.registro : [this.registro];
      this.registroArray = this.registroArray.map((element: any, index: number) => {
        return {
          ...element,
          index: index + 1
        };
      });
      this.filteredDataSource = new MatTableDataSource(this.registroArray);
      this.filteredDataSource.paginator = this.paginator;
      this.totalSize = this.registroArray.length;
      console.log(this.totalSize)
      console.log(this.registroArray)
      this.iterator();
    });
  }


  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.registroArray.slice(start, end);
    this.filteredDataSource = part;
  }


  paginateData(e: PageEvent) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  
}
