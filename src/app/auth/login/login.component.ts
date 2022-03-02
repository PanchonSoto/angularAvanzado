import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public auth2: any;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email] ],
    password: ['', [Validators.required] ],
    remember: [false]
  });

  constructor(
    private router: Router, 
    private fb: FormBuilder, 
    private usuarioS: UsuarioService,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.renderButton();
  }


  login(){
    this.usuarioS.login(this.loginForm.value)
      .subscribe((_)=>{
        this.router.navigateByUrl('/dashboard');
        if(this.loginForm.get('remember')!.value){
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        } else {
          localStorage.removeItem('email');
        }
        this.router.navigateByUrl('/');
      }, (err)=>{
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

  //const id_token = googleUser.getAuthResponse().id_token;
  
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });

    this.startApp();
  }



  async startApp() {
    await this.usuarioS.googleInit();
    this.auth2 = this.usuarioS.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  }

 attachSignin(element: any) {
    this.auth2.attachClickHandler(element, {},
        (googleUser: any) => {
          const id_token = googleUser.getAuthResponse().id_token;
          this.usuarioS.loginGoogle(id_token).subscribe((_)=>{
            this.ngZone.run(()=>{
              this.router.navigateByUrl('/');
            });
          });
          
        },(error: any)=> {
          console.log(error);
        });
  }

}
