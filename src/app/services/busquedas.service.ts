import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Usuario } from '../models/usuarios.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  public auth2: any;
  public usuario!: Usuario;

  constructor(private http: HttpClient, private router: Router) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  private transformarUsuarios(resultados: any[]): Usuario[] {
    return resultados.map(
      user => new Usuario(user.nombre,user.email,'',user.img, user.google, user.role, user.uid)
    );
  }


  buscar(tipo: 'usuarios'|'medicos'|'hospitales', termino: string) {
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;

    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((res:any) => {
          switch (tipo) {
            case 'usuarios':
              return this.transformarUsuarios(res.resultados);
              break;
          
            default:
              return;
              break;
          }
        })
      )
  }


}
