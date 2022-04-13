import { Component, OnDestroy, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { UsuarioService } from '../../../services/usuario.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

import { Usuario } from 'src/app/models/usuarios.model';
import { delay, Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [`
    .avatar{ border-radius: 100%; width: 50px; height:50px}
    a { cursor: pointer;}
    .user-img { cursor: pointer;}
  `
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public imgSubs!: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;

  constructor(private usuarioS: UsuarioService, 
              private busquedaS: BusquedasService,
              private modalImgS: ModalImagenService){ }


  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalImgS.nuevaImagen
      .pipe(delay(100))
      .subscribe(img => this.cargarUsuarios());
  }



  cargarUsuarios() {
    this.cargando = true;
    this.usuarioS.cargarUsuarios(this.desde)
      .subscribe(({total, usuarios})=>{
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
        console.log(this.usuarios);
      });
  
  }



  cambiarPagina(valor: number){
    this.desde += valor;
    if(this.desde < 0) {
      this.desde = 0;
    } else if (this.desde > this.totalUsuarios) {
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }


  buscar(termino: string) {
    if(termino.length === 0) {
      this.usuarios = this.usuariosTemp;
    }
    this.busquedaS.buscar('usuarios', termino)
      .subscribe(res =>{
        this.usuarios = res!;
      });
  }

  eliminarUsuario(usuario: Usuario) {
    Swal.fire({
      title: 'Borrar usuario?',
      text: `Esta apunto de borrar ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioS.eliminarUsuario(usuario)
          .subscribe((_)=> {
            Swal.fire('Usuario borrado',`${usuario.nombre} fue borrado correctamente`,'success')
            this.cargarUsuarios();
          });
      }
    })
  }

  eliminarme(usuario: Usuario): Boolean {
    const id = this.usuarioS.uid;
    return (usuario.uid === id) ? false : true;
  }

  cambiarRole(usuario :Usuario) {
    this.usuarioS.guardarUsuario(usuario)
      .subscribe(res => {
        console.log(res);
      });
  }

  abrirModal(usuario : Usuario) {
    this.modalImgS.abrirModal('usuarios',usuario.uid!, usuario.img);
  }

}
