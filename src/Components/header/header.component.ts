import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AppService } from '../../service/app.service';
import { Login } from '../../model/list.model';
import { Subscription } from 'rxjs';
import { MatTooltip } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, RouterLink, RouterOutlet, MatTooltip, MatMenuModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  public user: Login = new Login();
  public isLoggedIn: boolean = false;
  public productInCartCount: number = 0;
  private loggedInUserSubscription = new Subscription();
  private productInCartCountSubscription = new Subscription();
  constructor(private appService: AppService, private router: Router){
    
  }

  ngOnInit(): void {
    this.loggedInUserSubscription = this.appService.loggedInUser.asObservable().subscribe(
      {
        next: value => {
          this.user = value;
          if(this.user.Username!='None'){
            this.isLoggedIn=true;
          }
          else{
            this.isLoggedIn=false;
          }
        }
      });

      this.productInCartCountSubscription = this.appService.productsInCart.asObservable().subscribe(
        {
          next: value => {
            this.productInCartCount = value.length;
          }
        });
  }

  navigateToLogin(){
    this.router.navigateByUrl("/login");
  }

  navigateToRegister(){
    this.router.navigateByUrl("/signup");
  }

  onLogoutClick(){
    this.appService.loggedInUser.next(new Login());
    this.appService.currentHeader.next(this.appService.defaultHeader);
    this.router.navigateByUrl("/login");
  }
}
