import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from "../../app/Services/data-storage.service";
import {AuthService} from "../../app/Services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy{
  collapsed :boolean = true;
  isAuthenticated :boolean = false;
  private userSub: Subscription

  constructor(private dataStorageService:DataStorageService,private authService:AuthService) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe( user =>{
      this.isAuthenticated = !!user //!user ? false:true;
      console.log(!user)
      console.log(!!user)
    })
  }

  onLogout(){
    this.authService.logout()
  }

  onSaveData(){
    this.dataStorageService.storeRecipes().subscribe((Data)=>{
      console.log(Data)
    })
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe()
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }


}
