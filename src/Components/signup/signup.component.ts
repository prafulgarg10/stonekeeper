import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Register, RegisterResponse } from '../../model/list.model';
import { environment } from '../../environments/environment';
import { MessageDialogComponent } from '../Dialog/message-dialog/message-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-signup',
    imports: [ReactiveFormsModule, MatButtonModule],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.css'
})
export class SignupComponent {
  signup = new FormGroup({
    Username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    Password: new FormControl(),
    Email: new FormControl(undefined, [Validators.email, Validators.required, Validators.minLength(3)])
  });
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog) {

  }

  onSignup() {
    let postData = Object.assign({}, this.signup.value as Register);
    postData.SecretPassword = "";
    this.registerUser(postData);
  }

  registerUser(usr: Register) {
    this.http.post(this.apiUrl + '/register', usr).subscribe({
      next: data => {
        var res = data as RegisterResponse;
        if(res && res.status=="Success"){
          this.openDialog("User registered successfully", "Successful!", true);
        }
      },
      error: err => {
        this.openDialog("Problem adding user. Please try again later", "Failure!");
      }
    })
  }

  openDialog(msg: string, title: string, isSuccess: boolean = false) {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data:{
        message: msg,
        boxTitle: title
      }
    }).afterClosed().subscribe(() => {
      if(isSuccess){
        this.router.navigateByUrl("/login");
      }
    });
  }

}
