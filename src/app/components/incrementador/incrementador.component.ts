import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit{

  ngOnInit(): void {
    this.btnClase = `btn ${this.btnClase}`;
  }

  @Input('valor') progreso: number = 50;
  @Input() btnClase: string = 'btn-primary';

  @Output() valorChange: EventEmitter<number> = new EventEmitter();


  cambiarValor(valor: number) {
    if (this.progreso >= 100 && valor >= 0) {
      this.valorChange.emit(100);
      return this.progreso = 100;
    }

    if (this.progreso <= 0 && valor < 0) {
      this.valorChange.emit(0);
      return this.progreso = 0;
    }
    
    this.valorChange.emit(this.progreso);
    return this.progreso += valor;
  }

  onChange(valor:number){

    if (valor >= 100) {
      this.progreso = 100;
    } else if (valor <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = valor;
    }
    this.valorChange.emit(this.progreso);
  }

}
