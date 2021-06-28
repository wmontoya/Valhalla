import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  public name = 'Angular 5 chartjs';
  constructor(public chart: Chart) { }

  ngOnInit() {
 
  }

}
