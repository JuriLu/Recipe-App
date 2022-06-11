export class User {
  constructor(
    public email:string,
    public id:string,
    private _token:string,
    private _tokenExpirationDate:Date
  ){

  }

  get token(){
    //if there is no token expDate OR the current date is bigger than the expiration date (exp Date surpasses the current Date)
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
      return null
    }
    return this._token;
  }

}
