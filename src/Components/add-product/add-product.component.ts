import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category, Material, Product } from '../../model/product.model';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MessageDialogComponent } from '../Dialog/message-dialog/message-dialog.component';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AppService } from '../../service/app.service';
import { FileUploadComponent } from '../Common/file-upload/file-upload.component';
import { FileDTO } from '../../model/list.model';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatButtonModule, MatDialogModule, MessageDialogComponent, HttpClientModule, FileUploadComponent],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnChanges{
  @Input() categories: Category[] = [];
  @Input() materials: Material[] = [];
  private apiUrl = environment.apiUrl;
  product: Product = new Product();
  file: FileDTO | undefined;
  addProduct = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    weight: new FormControl(0),
    category: new FormControl(0),
    quantity: new FormControl(0),
    material: new FormControl(0)
  });

  constructor(private dialog: MatDialog, private http: HttpClient, private appService: AppService){}

  saveProduct(){
    this.product = this.addProduct.value as Product;
    if(this.file){
      this.product.productImage = this.file;
    }
    else{
      this.product.productImage = null;
    }
    if(this.product.category==0){
      this.openDialog('Category cannot be emplty. Please try again later.', 'Warning!');
      return;
    }
    if(this.product.material==0){
      this.openDialog('Material cannot be emplty. Please try again later.', 'Warning!');
      return;
    }
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
      this.addProduct.get('category')?.setValue(this.categories[0].id);
    }
    if(changes['materials'] && this.materials.length>0){
      this.addProduct.get('material')?.setValue(this.materials[0].id);
    }
  }

  addProductToDB(product: Product){
    let postData = Object.assign({}, product as Product);
    //this.http.post(this.apiUrl + '/add-product', product, {headers: new HttpHeaders().set('Content-Type', 'multipart/form-data')}).subscribe({
    this.http.post(this.apiUrl + '/add-product', postData, {headers: this.appService.currentHeader.value}).subscribe({
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

  onFileUpload(e:FileDTO){
    this.file = e;
  }
}

