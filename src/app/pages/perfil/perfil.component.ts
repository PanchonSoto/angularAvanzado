import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuarios.model';
import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {



  public perfilForm!: FormGroup;
  public usuario: Usuario;
  public imagenSubir!: File;
  public imgTemp: any;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private fileUpload: FileUploadService) { 
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email] ]
    });
  }


  actualizarPerfil() {
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
      .subscribe(()=>{
        const  {nombre, email} = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        Swal.fire('Guardado', 'Los cambios fueron guardados', 'success');
      }, (error)=>{
        Swal.fire('Error', error.error.msg, 'error');
      });
  }


  cambiarImagen(event: any){
    let file: File = event.target!.files[0];
    this.imagenSubir = file;

    if(!file){ 
      return this.imgTemp = null; 
    } else {
      
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onloadend = () => {
        this.imgTemp = reader.result;
      }
      return;
    }


  }

  subirImagen() {
    this.fileUpload.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid!)
      .then(img=>{
        this.usuario.img = img;
        Swal.fire('Guardado', 'La imagen se ha cambiado', 'success');
      });
  }

}
