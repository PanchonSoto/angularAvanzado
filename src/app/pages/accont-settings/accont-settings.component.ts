import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-accont-settings',
  templateUrl: './accont-settings.component.html',
  styleUrls: ['./accont-settings.component.css']
})
export class AccontSettingsComponent implements OnInit {

  
  

  constructor(private settingService: SettingsService) { }

  ngOnInit(): void {
    this.settingService.checkCurrentTheme();
  }


  changeTheme(theme: string) {
    
    this.settingService.changeTheme(theme);
    
  }

  

}
