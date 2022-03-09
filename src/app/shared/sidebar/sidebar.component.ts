import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from 'src/app/models/usuarios.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  
  public menuItem: any[]=[];
  public usuario: Usuario;


  constructor(private sidebarService: SidebarService, private usuarioS: UsuarioService) {
    this.menuItem = sidebarService.menu;
    this.usuario = usuarioS.usuario;
  }


  ngOnInit(): void {
    
  }

}
