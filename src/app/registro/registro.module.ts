import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// importamos esta: import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroPageRoutingModule } from './registro-routing.module';

import { RegistroPage } from './registro.page';


// importamos AuthService
//import { AuthService } from '../services/auth.service';
import { RegisterServiceService } from '../service/register-service.service';
//importamos el router
import { Router } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroPageRoutingModule,
    //impotamos: ReactiveFormsModule
    ReactiveFormsModule
  ],
  declarations: [RegistroPage]
})


export class RegistroPageModule {

  
}

