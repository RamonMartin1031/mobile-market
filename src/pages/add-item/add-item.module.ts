import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddItemPage } from './add-item';
import { HttpModule } from '@angular/http';
@NgModule({
  declarations: [
    AddItemPage,
  ],
  imports: [
    HttpModule,
    IonicPageModule.forChild(AddItemPage),
  ],
})
export class AddItemPageModule {}
