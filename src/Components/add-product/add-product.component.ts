import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category, Material, Product } from '../../model/product.model';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MessageDialogComponent } from '../Dialog/message-dialog/message-dialog.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AppService } from '../../service/app.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatButtonModule, MatDialogModule, MessageDialogComponent, HttpClientModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnChanges{
  @Input() categories: Category[] = [];
  @Input() materials: Material[] = [];
  private apiUrl = environment.apiUrl;
  product: Product = new Product();
  addProduct = new FormGroup({
    Name: new FormControl(''),
    Weight: new FormControl(null),
    Category: new FormControl(0),
    Quantity: new FormControl(null),
    Material: new FormControl(0)
  });

  constructor(private dialog: MatDialog, private http: HttpClient, private appService: AppService){}

  saveProduct(){
    this.product = this.addProduct.value as Product;
    this.addProductToDB(this.product);
  }

  openDialog(msg: string, title: string) {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data:{
        message: msg,
        boxTitle: title
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['categories'] && this.categories.length>0){
      this.addProduct.get('Category')?.setValue(this.categories[0].Id);
    }
    if(changes['materials'] && this.materials.length>0){
      this.addProduct.get('Material')?.setValue(this.materials[0].Id);
    }
  }

  addProductToDB(category: Product){
    this.http.post(this.apiUrl + '/add-product', category).subscribe({
        next: data => {
            if(data){
              console.log("result", data);
              this.openDialog('Product Added Successfully.', 'Confirmation!');
              this.appService.getProductsFromDB();
            }
        },
        error: err => { 
            console.log("Error", err);
            this.openDialog('Problem adding product. Please try again later.', 'Failure!');
        }
    })
}
}

