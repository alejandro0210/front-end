import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
// importamos esta: import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { IonicModule } from '@ionic/angular';

import { ForgotPasswordPageRoutingModule } from './forgot-password-routing.module';

import { ForgotPasswordPage } from './forgot-password.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotPasswordPageRoutingModule,
    //impotamos: ReactiveFormsModule
    ReactiveFormsModule
  ],
  
  declarations: [ForgotPasswordPage]
  
})
export class ForgotPasswordPageModule {}
