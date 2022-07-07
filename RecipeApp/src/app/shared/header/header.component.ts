import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from "../../Services/data-storage.service";
import {AuthService} from "../../Services/auth.service";
import {map, Subscription} from "rxjs";
import * as fromAppReducer from "../../store/app.reducer"
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed: boolean = true;
  isAuthenticated: boolean = false;
  private userSub: Subscription

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store<fromAppReducer.AppState>
  ) {
  }

  ngOnInit() {
    this.userSub = this.store.select('auth').pipe(map(authState => authState.user)).subscribe(user => {
      this.isAuthenticated = !!user //!user ? false:true;
      })
  }

  onLogout() {
    this.authService.logout()
  }

  onSaveData() {
    this.dataStorageService.storeRecipes().subscribe((Data) => {
      console.log(Data)
    })
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe()
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }


}
