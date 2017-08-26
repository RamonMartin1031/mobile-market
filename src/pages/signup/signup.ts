import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from "@angular/forms";
import { Http } from "@angular/http";

import 'rxjs/add/operator/map';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signUpForm : FormGroup; 
  public formSubmit:Boolean = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: Http,
              public fb: FormBuilder) {
    this.signUpForm = this.fb.group({
      username: ["",Validators.required, this.checkIfExist.bind(this) ],
      phonenumber: ["", Validators.compose([Validators.required, this.checkPhoneNumber])],
      email: ["", Validators.compose([Validators.email, Validators.required])],
      firstname: ["", Validators.compose([Validators.required,  Validators.maxLength(12)])],
      lastname: ["", Validators.compose([Validators.required, Validators.maxLength(12)])],
      password: ["", Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmPassword: ["", Validators.compose([Validators.required, this.matchPassword])]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  submit(){
    this.formSubmit = true;
    if(this.signUpForm.invalid){
      return;
    }
    let data = JSON.stringify(this.signUpForm.value)
    this.http.post("https://mobile-app-development.000webhostapp.com/mmphp/createuser.php", data)
    .map(res=> res.json())
    .subscribe(res=>{
      this.navCtrl.pop();
    }, err=>{
      console.log(err)
    })
  }
  public checkIfExist(control: FormControl): any {
    
   return new Promise(resolve => {
     let data = JSON.stringify({username: control.value});
     this.http.post('https://mobile-app-development.000webhostapp.com/mmphp/checkuser.php', data).map(res=>res.json()).subscribe((res)=>{
       console.log(res)
        if(!res){
            resolve(null);
        }else{
            resolve({taken: true});
        }
    
     }, err=>{
         resolve(true)
     })
   

   });
 }

 matchPassword(AC: AbstractControl) {
  const formGroup = AC.parent;
  if (formGroup) {
       const passwordControl = formGroup.get('password'); 
       const confirmPasswordControl = formGroup.get('confirmPassword'); 

       if (passwordControl && confirmPasswordControl) {
           const password = passwordControl.value;
           const confirmPassword = confirmPasswordControl.value;
           if (password !== confirmPassword) { 
               return { matchPassword: true };
           } else {
               return null;
           }
       }
  }

  return null;
}

checkPhoneNumber(AC: AbstractControl) {
  const formGroup = AC.parent;
  if (formGroup) {
       var passwordControl = formGroup.get('phonenumber'); 
       var t = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(passwordControl.value);

        if(!t){
          return { match: true };
        }else{
          return null;
        }
  }
 
}
}
