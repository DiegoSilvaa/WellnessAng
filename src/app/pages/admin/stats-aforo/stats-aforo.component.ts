import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

interface Row {
  fecha: Date;
  valor: number;
}
const ELEMENT_DATA: Row[] = [
  { fecha: new Date('2023/05/02'), valor: 100 },
  { fecha: new Date('2023/04/02'), valor: -50 },
  { fecha: new Date('2023/04/03'), valor: 200 },
  { fecha: new Date('2023/04/04'), valor: -150 },
  { fecha: new Date('2023/04/05'), valor: 50 },
  { fecha: new Date('2023/04/06'), valor: 300 },
  { fecha: new Date('2023/04/07'), valor: -250 },
  { fecha: new Date('2023/04/08'), valor: 150 },
  { fecha: new Date('2023/04/09'), valor: -100 },
  { fecha: new Date('2023/04/10'), valor: 250 },
  { fecha: new Date('2023/04/11'), valor: -200 },
  { fecha: new Date('2023/04/12'), valor: 350 },
];

@Component({
  selector: 'app-stats-aforo',
  templateUrl: './stats-aforo.component.html',
  styleUrls: ['./stats-aforo.component.css']
})
export class StatsAforoComponent implements OnInit {

  dataSource = new MatTableDataSource<Row>(ELEMENT_DATA);
  displayedColumns: string[] = ['fecha', 'valor'];

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    const parsedValue = Date.parse(filterValue);
    console.log("VALOR: " + parsedValue)
    if (!isNaN(parsedValue)) {
      const filteredData = ELEMENT_DATA.filter(row => 
        row.fecha.getTime() === parsedValue);
      console.log(filteredData);
      this.dataSource = new MatTableDataSource(filteredData);
      this.dataSource.paginator = this.paginator;
    }
  }

  getRowClass(row: Row) {
    return row.valor < 0 ? 'negative' : 'positive';
  }
}
