import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { tap,map, catchError } from "rxjs/operators";
import { Observable,of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { CargarUsuario } from '../interfaces/cargar-usuarios.interfaces';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuarios.model';



const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario!: Usuario;

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.googleInit(); 
    
  }

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



  googleInit() {
    
    return new Promise<void>(resolve =>{
      gapi.load('auth2', ()=>{
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '540811714371-i9kl7mth68uo1h8vjufo7teggfp4ohdj.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });
        resolve();
      });
    });
  }



  logout() {
    localStorage.removeItem('token');
    this.auth2.signOut().then(()=>{
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login');
      }); 
    });
  }



  validarToken(): Observable<boolean> {

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (resp: any) => {
        const { nombre, google, email, role, uid, img='' } = resp.usuario;
        this.usuario = new Usuario(nombre,email,'',img, google, role, uid);
        if(!this.token===undefined || !this.token) localStorage.setItem('token', resp.token );
        return true;
      }),
      catchError( error => {
        return of(false)
      } )
    );

  }



  login( formData: LoginForm ) {
    
    return this.http.post(`${ base_url }/login`, formData )
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token )
                  })
                );

  }


  
  crearUsuario( formData: RegisterForm ) {
    
    return this.http.post(`${ base_url }/usuarios`, formData )
              .pipe(
                tap( (resp: any) => {
                  localStorage.setItem('token', resp.token )
                })
              );
  }



  actualizarPerfil(data: {email:string, nombre: string}){
    return this.http.put(`${ base_url }/usuarios/${this.uid}`, data, this.headers);
  }



  loginGoogle(token: any) {
    
    return this.http.post(`${base_url}/login/google`,{token})
      .pipe(
        tap((resp:any)=>{
          localStorage.setItem('token', resp.token);
        })
      );
  }


  cargarUsuarios(desde: number = 0) {
    const url = `${base_url}/usuarios?desde=${desde}`;

    return this.http.get<CargarUsuario>(url, this.headers)
      .pipe(
        map(res=>{
          const usuarios = res.usuarios.map(user => new Usuario(user.nombre,user.email,'',user.img,user.google,user.role,user.uid))
          return {
            total: res.total,
            usuarios
          };
        })
      )
  }


  eliminarUsuario(usuario: Usuario) {
    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete(url,this.headers);
  }

  guardarUsuario(usuario: Usuario){
    return this.http.put(`${ base_url }/usuarios/${usuario.uid}`, usuario, this.headers);
  }

}
