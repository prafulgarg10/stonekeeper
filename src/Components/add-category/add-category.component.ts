import { Component, EventEmitter, Output } from '@angular/core';
import { Category } from '../../model/product.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MessageDialogComponent } from '../Dialog/message-dialog/message-dialog.component';
import { AppService } from '../../service/app.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatDialogModule, HttpClientModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  private apiUrl = environment.apiUrl;
  category: Category = new Category();
  addCategory = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)] ),
    purity: new FormControl(100, [Validators.required, Validators.min(0)]),
    sellingPurity: new FormControl(100, [Validators.required, Validators.min(0)]),
    description: new FormControl('')
  });

  constructor(private dialog: MatDialog, private appService: AppService, private http: HttpClient){}

  saveCategory(){
    this.category = this.addCategory.value as Category;
    this.addCategoryToDB(this.category);
  }

  openDialog(msg: string, title: string) {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data:{
        message: msg,
        boxTitle: title
      }
    });
  }

  addCategoryToDB(category: Category){
    this.http.post(this.apiUrl + '/add-category', category, {headers: this.appService.currentHeader.value}).subscribe({
        next: data => {
            if(data){
              console.log("result", data);
              this.openDialog('Category Added Successfully.', 'Confirmation!');
              this.appService.getCategoriesFromDB();
            }
        },
        error: err => { 
            console.log("Error", err);
            this.openDialog('Problem adding category. Please try again later.', 'Failure!');
        }
    })
}
}
