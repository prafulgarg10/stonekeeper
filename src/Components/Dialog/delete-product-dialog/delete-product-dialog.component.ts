import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../model/product.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-delete-product-dialog',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './delete-product-dialog.component.html',
  styleUrl: './delete-product-dialog.component.css'
})
export class DeleteProductDialogComponent implements OnInit {
  public title: string = '';
  public product: Product = new Product();

  constructor(private dialogRef: MatDialogRef<DeleteProductDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {title: string, product: Product}){

  }

  ngOnInit(){
    this.title = this.data.title;
    this.product = this.data.product; 
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
