import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  constructor() {
    
  }

  setUser(obj:any){
    window.localStorage.setItem("user", JSON.stringify(obj));
  }

  getUser(){
    let user = JSON.parse(window.localStorage.getItem("user"));
  }

}
