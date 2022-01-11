import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private theme = document.querySelectorAll('#tema');

  constructor() {
    const ola = localStorage.getItem('theme')|| '/assets/css/colors/megna-dark.css';

    this.theme[0].setAttribute('href',ola);
  }

  changeTheme(theme: string) {
    
    const url =`/assets/css/colors/${theme}.css`;
  
    this.theme[0].setAttribute('href',url);
    localStorage.setItem('theme',url);

    this.checkCurrentTheme();
  }


  checkCurrentTheme(){
    const links = document.querySelectorAll('.selector');
    
    links!.forEach(elem=>{
      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `/assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.theme[0].getAttribute('href');

      if(btnThemeUrl === currentTheme){
        elem.classList.add('working');
      }
    });
    
  }
}
