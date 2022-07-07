import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "../Services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode : boolean = true;
  isLoading : boolean = false;
  error : string = null;


  constructor(private authService : AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  //(click) that alternates the mode
  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form:NgForm){

    if (!form.valid){
      return;
    }
    //Values we get from the user input
    const email = form.value.email;
    const password = form.value.password;

    //Observable created to subscribe lated
    let authObs:Observable<AuthResponseData>

    //to show the loading spinner
    this.isLoading = true;

    //Get the alternatives if we are in logging or signup mode based on the user input (click) onSwitchMode()
    if (this.isLoginMode){
      authObs = this.authService.login(email,password)
    }else{
      authObs = this.authService.signup(email,password)
    }

    //subscribe to whichever observable that was from the if else condition
    authObs.subscribe(
      (resData) => {
        this.isLoading = false
        this.router.navigate(['/recipes'])
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage
        this.isLoading = false
      }
    );

    form.reset()
  }

  onHandleError(){
    this.error = null
  }

}
