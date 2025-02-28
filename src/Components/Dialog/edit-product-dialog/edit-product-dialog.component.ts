import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../../model/product.model';

@Component({
  selector: 'app-edit-product-dialog',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './edit-product-dialog.component.html',
  styleUrl: './edit-product-dialog.component.css'
})
export class EditProductDialogComponent implements OnInit{
  public title: string = '';
  public product: Product = new Product();

  constructor(private dialogRef: MatDialogRef<EditProductDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {title: string, product: Product}){
    }

  ngOnInit(){
    this.title = this.data.title;
    this.product = this.data.product; 
  }  

    closeDialog(){
      this.dialogRef.close();
    }
}
