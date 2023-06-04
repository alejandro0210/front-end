import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterServiceService } from '../service/register-service.service';
@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {

id : any;
LoginForm: FormGroup;
user: any;
id_user: any;

constructor
(
  //objeto de la autenticacion
  private api: RegisterServiceService,
  private router: Router,
  private formBuilder: FormBuilder,
) 
//validacion del metodo para que si se logie
{
  this.LoginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
}

ngOnInit() {
}

ionViewWillEnter() {
  this.LoginForm.reset();
}

login(){
 
 
      //metodo del login, pasandole como parametros los valores del formulario
  this.api.login(this.LoginForm.get('email')?.value, this.LoginForm.get('password')?.value).subscribe(
     (response: any)  => {
      console.log(response);
      localStorage.setItem('access_token',response.token)
      localStorage.setItem('id_user',response.data.id)
      
      console.log('Se inicio sesión correctamente');
     
      this.router.navigate(['/home']);
      
    },
     (error) => {
      console.log(error.error.message);
      this.router.navigate(['/inicio-sesion']);
    }
  );
}


}


