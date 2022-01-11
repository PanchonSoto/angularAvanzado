import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
/*
     const promesa = new Promise((resolve,reject)=>{

      if(false){
        resolve('ola mundo');
      } else {
        reject('Algo salio mal');
      }
    });
    promesa.then((msj)=>{
      console.log(msj);
    })
    .catch(error=> console.log('Salio un error, ',error)); */

    this.getUsuarios();
  }

  getUsuarios(){
    fetch('https://reqres.in/api/users')
      .then(resp=> resp.json())
      .then(body=>console.log(body.data))
  }

}
