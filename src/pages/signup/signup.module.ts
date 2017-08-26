import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
import { HttpModule } from '@angular/http'
@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    HttpModule,
    IonicPageModule.forChild(SignupPage),
  ],
})
export class SignupPageModule {}
