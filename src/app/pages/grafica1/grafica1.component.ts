import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartType,Color } from 'chart.js';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  constructor(){
    console.log(this.data1);
    
  }

  public labels1 = ['Pan', 'Refresco', 'Tacos'];
  public data1: ChartData<'doughnut'> = {
    labels: this.labels1,
    datasets: [
      { data: [ 30, 40, 100 ] }
    ]
  };
 

}
