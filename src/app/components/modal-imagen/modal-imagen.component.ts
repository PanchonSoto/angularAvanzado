import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir!: File;
  public imgTemp: any;

  constructor(public modalImgS: ModalImagenService, public fileUservice: FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.imgTemp = null;
    this.modalImgS.cerrarModal();
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
    const id = this.modalImgS.id;
    const tipo = this. modalImgS.tipo;

    this.fileUservice.actualizarFoto(this.imagenSubir, tipo, id!)
      .then(img=>{
        Swal.fire('Guardado', 'La imagen se ha cambiado', 'success');
        this.modalImgS.nuevaImagen.emit(img);
        this.cerrarModal();
      });
  }

}
