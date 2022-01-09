import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {

  progreso1: number = 25;
  progreso2: number = 35;

  get Progreso1() {
    return `${this.progreso1}%`
  }

  get Progreso2() {
    return `${this.progreso2}%`
  }

  cambioValor(valor: number){
    
    this.progreso1 = valor;
    
  }
 
}
