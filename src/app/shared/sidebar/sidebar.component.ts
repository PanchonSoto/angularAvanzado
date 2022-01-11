import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor(private sidebarService: SidebarService) { }

  menuItem: any[]=[];

  ngOnInit(): void {
    this.menuItem = this.sidebarService.menu;
  }

}
