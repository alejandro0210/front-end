import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { RegisterServiceService } from '../service/register-service.service';
import { AlertController, NavController } from '@ionic/angular';



@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})


export class ForgotPasswordPage implements OnInit {

  
  email: any;
  

  constructor
    ( 
      
      private api: RegisterServiceService,
     
          //Objeto para poder usar todos los elementos del RegisterServiceService
          private registerService: RegisterServiceService,
          //Objeto para poder navegar dentro de la app
          private router: Router,
          //Objeto para poder usar alertas
          private alertController: AlertController,
          //@Inject(EmailComposer) private emailComposer: EmailComposer
          private navCtrl: NavController
    ) 
      {}

      forgotPassword()
      {
        //llamamos al metodo que contiene la ruta del servicio en laravel y le pasamos como parametro el email del html
        this.registerService.actualizarRandomPassword(this.email).subscribe(async response => {

          console.log(response.new_password);
          //cuando el resultado del response sea indefinido quiere decir que no existe ningun usuario
          if(response.new_password==undefined)
          {
            const alert = await this.alertController.create({
              header: 'Contraseña no actualizada',
              message: `El email ingresado no le corresponde a ningun usuario`,
              buttons: ['OK']
            });
            await alert.present();  
            this.router.navigate(['/forgot-password']);
          }
          else
          {
            //const newPassword = response.new_password; // Obtener el valor de new_password
            //creamos una alerta para cuando se actualice correctamente la contraseña
            const alert = await this.alertController.create({
              header: 'Contraseña actualizada correctamente',
              message: `Nueva contraseña: `+response.new_password,
              buttons: ['OK']
            });
            await alert.present();  
            
            //FORMATO PARA MANDAR CORREO
            const emailUrl = "mailto:" + this.email + 
            "?subject=Nueva contraseña para la app de cobranza&body=Su nueva contraseña es: " + response.new_password;
            //maito es aqui va dirigido el correo
            //subject es el asunto del correo
            //body es el cuerpo del correo (el mensaje a mandar)

            //ABRIMOS UNA VENTANA CON EL FORMATO ANTERIOR
            window.open(emailUrl, '_system');

           
            console.log('Email enviado ');

            this.router.navigate(['/login']);
          }

        },
        //creamos una alerta para cuando no se actualice correctamente la contraseña
        async (error) => {
          const alert = await this.alertController.create({
            header: 'Error',
            message: error.error.message,
            buttons: ['OK']
          });
          await alert.present();
        }
        );
      }  
    

      newPassword()
      {
        //llamamos al metodo que contiene la ruta del servicio en laravel y le pasamos como parametro el email del html
        this.api.newPassword(this.email).subscribe(response => {

          if(response.nueva_password==undefined)
          {
            console.log("El email ingresado no le corresponde a ningun usuario");
          }
          else
          {
          console.log(response.mensaje);
          console.log("Nueva Contraseña "+response.nueva_password);
          this.router.navigate(['/inicio-sesion']);
          }
          
          }
          );
      }

      
  ngOnInit() 
  {
  }




}
