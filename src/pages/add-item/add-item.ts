import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import { CameraService } from "../../providers/camera.service";
import { UserServiceProvider } from "../../providers/user-service/user-service";
@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {
  addItemForm : FormGroup;
  image:any;
  formSubmit : Boolean = false;
  user:any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public http: Http, 
              public cameraService: CameraService,
              public userService: UserServiceProvider,
              public fb: FormBuilder) {
    this.addItemForm = this.fb.group({
      itemname: ["",Validators.required],
      itemdescription: ["", Validators.compose([Validators.required])],
      ownersremarks: ["", Validators.compose([ Validators.required])],
      itemcategory: ["", Validators.compose([Validators.required ])],
      itemaskingprice: ["", Validators.compose([Validators.required,])],
      itemcashprice: ["", Validators.compose([Validators.required ])],
      itemcondition: ["", Validators.compose([Validators.required])],
      ownerid: ["yblake@gmail.com"]
    })

    this.user =this.userService.getUser();

  }

  submit(){
    this.formSubmit= true;
    if(this.addItemForm.invalid){
      this.formSubmit= false
    }
    let data = JSON.stringify(this.addItemForm.value);
    this.http.post("https://mobile-app-development.000webhostapp.com/mmphp/insertitem.php", data)
    .subscribe(res=>{
      this.addItemForm.reset();
    }, err=>{
      console.log(err)
    })
  }

  takePicture(){
    this.cameraService.takePicture(res=>{
        if(res=="success"){
          this.image = this.cameraService.getImage();
        }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddItemPage');
  }

}
