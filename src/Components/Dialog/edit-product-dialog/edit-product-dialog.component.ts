import { Component, Inject, Input, OnInit, SimpleChanges } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Category, Material, Product } from '../../../model/product.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { HttpClient } from '@angular/common/http';
import { FileUploadComponent } from '../../Common/file-upload/file-upload.component';
import { environment } from '../../../environments/environment';
import { FileDTO } from '../../../model/list.model';
import { AppService } from '../../../service/app.service';

@Component({
    selector: 'app-edit-product-dialog',
    imports: [MatIconModule, ReactiveFormsModule, CommonModule, MatButtonModule, MatDialogModule, MessageDialogComponent],
    templateUrl: './edit-product-dialog.component.html',
    styleUrl: './edit-product-dialog.component.css'
})
export class EditProductDialogComponent implements OnInit{
  public title: string = '';
  public product: Product = new Product();
  public productImage: FileDTO | null = null;
  public productId: number = 0;
  public categories: Category[] = [];
  public materials: Material[] = [];
  private apiUrl = environment.apiUrl;
  file: FileDTO | undefined;
  editProduct = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    weight: new FormControl(0),
    category: new FormControl(0),
    quantity: new FormControl(0),
    material: new FormControl(0)
  });
  constructor(private dialogRef: MatDialogRef<EditProductDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {title: string, product: Product, categories: Category[], materials: Material[]}, private dialog: MatDialog, private http: HttpClient, private appService: AppService){
    }

  ngOnInit(){
    this.title = this.data.title;
    this.product = this.data.product; 
    this.categories = this.data.categories;
    this.materials = this.data.materials;
    this.editProduct.get('name')?.setValue(this.product.name);
    this.editProduct.get('weight')?.setValue(this.product.weight);
    this.editProduct.get('category')?.setValue(this.product.category);
    this.editProduct.get('quantity')?.setValue(this.product.quantity);
    this.editProduct.get('material')?.setValue(this.product.material);
    this.productImage = this.product.productImage;
    this.productId = this.product.id;
  }  

    closeDialog(){
      this.dialogRef.close();
    }

    updateProduct(){
      this.product = this.editProduct.value as Product;
      this.product.productImage = this.productImage;
      this.product.id = this.productId;
      if(this.product.category==0){
        this.openDialog('Category cannot be emplty. Please try again later.', 'Warning!');
        return;
      }
      if(this.product.material==0){
        this.openDialog('Material cannot be emplty. Please try again later.', 'Warning!');
        return;
      }
      this.updateProductToDB(this.product);
    }
  
    openDialog(msg: string, title: string, isSuccess: boolean = false) {
      const dialogRef = this.dialog.open(MessageDialogComponent, {
        data:{
          message: msg,
          boxTitle: title
        }
      }).afterClosed().subscribe(() => (this.closeDialog(), isSuccess ? this.appService.getProductsFromDB() : ''));
    }
  
    ngOnChanges(changes: SimpleChanges): void {
      if(changes['categories'] && this.categories.length>0){
        this.editProduct.get('category')?.setValue(this.categories[0].id);
      }
      if(changes['materials'] && this.materials.length>0){
        this.editProduct.get('material')?.setValue(this.materials[0].id);
      }
    }
  
    updateProductToDB(product: Product){
      let postData = Object.assign({}, product as Product);
      this.http.post(this.apiUrl + '/update-product', postData, {headers: this.appService.currentHeader.value}).subscribe({
          next: data => {
              if(data){
                console.log("result", data);
                this.openDialog('Product updated Successfully.', 'Confirmation!', true);
              }
          },
          error: err => { 
              console.log("Error", err);
              this.openDialog('Problem updating product. Please try again later.', 'Failure!');
          }
      })
    }
  
}
