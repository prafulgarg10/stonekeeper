import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login, LoginResponse } from '../../model/list.model';
import { environment } from '../../environments/environment';
import { MessageDialogComponent } from '../Dialog/message-dialog/message-dialog.component';
import { AppService } from '../../service/app.service';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, MatButtonModule,],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
  signup = new FormGroup({
    Username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    Password: new FormControl()
  });
  private apiUrl = environment.apiUrl;

  constructor(private appService: AppService, private http: HttpClient, private router: Router, private dialog: MatDialog) {

  }

  onLogin() {
    let postData = Object.assign({}, this.signup.value as Login);
    this.getTokenForLoggedInUser(postData);
  }

  async getTokenForLoggedInUser(usr: Login) {
    this.http.post(this.apiUrl + '/login', usr).subscribe({
      next: data => {
        this.appService.loggedInUser.next(usr);
        let res = data as LoginResponse;
        if (res != null && res.token != null) {
          this.appService.currentHeader.next(new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${res.token}`
          }));
          this.appService.getCategoriesFromDB();
          this.appService.getProductsFromDB();
          this.appService.getMaterialsFromDB();
          this.appService.getLatestMaterialsPriceFromDB();
          this.appService.getOrdersSummaryFromDB();
          this.router.navigateByUrl("/");
        }
      },
      error: err => {
        this.appService.loggedInUser.next(new Login());
        this.appService.currentHeader.next(this.appService.defaultHeader);
        let res:any = err.error;
        if(res?.message){
          this.openDialog(res.message, 'Failure!');
        }
        else{
          this.openDialog("Problem while logging in. Please try again later.", "Failure!");
        }
      }
    })
  }

  openDialog(msg: string, title: string) {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data:{
        message: msg,
        boxTitle: title
      }
    });
  }

}
