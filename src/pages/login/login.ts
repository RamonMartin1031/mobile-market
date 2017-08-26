import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { FormControl, FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Http } from '@angular/http'

import 'rxjs/add/operator/map';
import { UserServiceProvider } from "../../providers/user-service/user-service";
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm: FormGroup;
  public isSubmit:Boolean = false;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: Http,
              public userService: UserServiceProvider,
              public menu:MenuController,
              public fb:FormBuilder) {
          this.loginForm = this.fb.group({
            'username': ["", Validators.compose([Validators.required])],
            'password': ["", Validators.compose([Validators.required])]
          })
      this.menu.swipeEnable(false);
  }

  submit(){
    this.isSubmit = true;
    if(this.loginForm.invalid){
      return
    }

    let values = JSON.stringify(this.loginForm.value)
    this.http.post("https://mobile-app-development.000webhostapp.com/mmphp/login.php", values)
    .map(res=>res.json())
                .subscribe((res)=>{ 
                  this.userService.setUser(res);
                },
                err=>{ console.log(err)})
  }

  toSignUp(){
    this.navCtrl.push("SignupPage")
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
