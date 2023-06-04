import { Component, OnInit } from '@angular/core';
//importacion de los formgroup
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
//importamos el router
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Subscriber } from 'rxjs';
// service de registro
import { RegisterServiceService } from '../service/register-service.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit 
{
// se agrego el FormGroup
formReg: FormGroup;
myCheckboxControl = new FormControl(false);

constructor
(
  private api: RegisterServiceService,
  private router: Router,
  private formBuilder: FormBuilder
) 
{
this.formReg = this.formBuilder.group({
  name: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(6)]],
});
}


  ngOnInit() 
  {
  }


register()
{
  if(this.formReg.valid)
  {
   
    const {name, email, password}=this.formReg.value;
    this.api.resgister(name, email, password).subscribe(async (response: any)  => 
    {
      console.log("Respone: ",response);
      if(response.data=='User already exists!')
      {
        console.log("Usuario ya existente");
        this.router.navigate(['/registro']);
      }
      else
      {
        console.log("Registro exitoso");
        this.router.navigate(['/']);
      }
     
    },
    //Creamos esta alerta que indica que el login no fue exitoso y mostramos el error en un mensaje
     (error) => {
      console.log(error.error.message);
      this.router.navigate(['/registro']);
    }
    
    )
  }
}

onSubmit(){
}


}
