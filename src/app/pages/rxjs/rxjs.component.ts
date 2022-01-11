import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, retry, interval, take, map, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervalSub: Subscription;


  constructor() { 
 

   /*  this.retornaObservable().pipe(
      retry()
    ).subscribe(
      valor => console.log('Subs: ', valor),
      error => console.warn('Error: ', error),
      () => console.info('Observable terminado')
    ) */
  
    this.intervalSub = this.retornaIntervalo()
      .subscribe(console.log)

  }

  ngOnDestroy(): void {
    this.intervalSub.unsubscribe();
  }

 

  retornaIntervalo():Observable<number>{

    return interval(500).pipe(
      map(valor=> valor +1),
      filter(valor=> (valor%2 === 0) ? true : false),

    );
    
  }

  retornaObservable(): Observable<number>{ 
    let i=-1;
    
    return new Observable<number>(observer =>{
      
      const intervalo = setInterval(()=>{
        i++;
        observer.next(i);

        if(i===4){
          clearInterval(intervalo);
          observer.complete();
        }
        if(i===2){
          observer.error('i llego al valor de 2');
        }
      },1000);
    });

    
  }

}
