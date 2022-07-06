import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {User} from "../Models/user.model";
import {Router} from "@angular/router";

export interface AuthResponseData{
  idToken : string,
  email : string,
  refreshToken : string,
  expiresIn : string,
  localId : string,
  registered? : boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null)

  signUpUrl : string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDQOIHYCX0homh4OBJk1ZBnsxNiGbTMVBc'
  signInUrl : string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDQOIHYCX0homh4OBJk1ZBnsxNiGbTMVBc'

  private tokenExpTimer : any;

  constructor(private http : HttpClient,private router:Router) { }



  signup(email:string,password:string) : Observable<any>{
    return this.http.post<AuthResponseData>(
      this.signUpUrl,
      {
        email:email,
        password:password,
        returnSecureToken:true
      })
      .pipe(catchError(this.handelError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
           +resData.expiresIn)
        })
      );
  }


  login(email:string,password:string){
    return this.http.post<AuthResponseData>(
      this.signInUrl,
      {
          email:email,
          password:password,
          returnSecureToken:true
        })
      .pipe(catchError(this.handelError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn)
        })
      )
  }

  //automatically logins the user even when the page is refreshed, by getting the data of the user stored in the localstorage,
  //creating a new loaded user and authentication this user if it has a token or not

  autoLogin(){
    const userData: {
      email : string;
      id : string;
      _token : string;
      _tokenExpirationDate : string;
    } = JSON.parse(localStorage.getItem('userData'))
    if (!userData){
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token){
      this.user.next(loadedUser)
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime() // the difference in milliseconds,time till token expires
      this.autoLogout(expirationDuration)
    }
  }




  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');

    if (this.tokenExpTimer){
      clearTimeout(this.tokenExpTimer)
    }

    this.tokenExpTimer = null;
  }

  //automatically logouts the user when the token expires
  //Logicaly we use this function (start the timer),every time we EMIT a USER

  autoLogout(expirationDuration : number){
    console.log(expirationDuration)
    // we must stop the setTimeout when we manually click the logout button,by storing in a variable and clearing in the logout function
    this.tokenExpTimer = setTimeout(() => {
      this.logout()
    },expirationDuration);  // set expirationDuration to 3000 or whatever number to simulate a shorter token expiration

  }


  private handelError(errorRes:HttpErrorResponse){
    let errorMessage = 'Unknown Error Ocurred'

    if (!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage)
    }
    switch (errorRes.error.error.message){
      case 'EMAIL_EXISTS':
        errorMessage = 'This email Already Exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This user is not created';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct';
        break;
    }
    return throwError(errorMessage)
  }


  private handleAuthentication (email:string, localId:string, idToken:string, expiresIn:number){

    //(the first new Date wraps everything in Date object format)
    // create the expiration date with new Date and we get the time
    // in miliseconds and add the expiration Time also in miliseconds
    // * 1000 to convert in seconds
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    console.log(expirationDate)
    const user = new User(
      email,
      localId,
      idToken,
      expirationDate
    );

    this.user.next(user)
    this.autoLogout(expiresIn * 1000)  // in milliseconds
    //Save the user in local storage in order to save it from refresh
    localStorage.setItem('userData',JSON.stringify(user))
  }


}
