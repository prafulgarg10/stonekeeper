import { Component, Input } from '@angular/core';
import { Category, Material, Product } from '../../model/product.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { EditProductDialogComponent } from '../Dialog/edit-product-dialog/edit-product-dialog.component';
import { DeleteProductDialogComponent } from '../Dialog/delete-product-dialog/delete-product-dialog.component';
import { AddProductToCartDialogComponent } from '../Dialog/add-product-to-cart-dialog/add-product-to-cart-dialog.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() productsList: Product[] = [];
  @Input() categories: Category[] = [];
  @Input() materials: Material[] = [];

  constructor(private dialog: MatDialog){

  }

   openEditDialog(product: Product) {
      const dialogRef = this.dialog.open(EditProductDialogComponent, {
        data:{
          title: "Edit " + product.name,
          product: product,
          categories: this.categories,
          materials: this.materials
        }
      });
    }

    openDeleteDialog(product: Product) {
      const dialogRef = this.dialog.open(DeleteProductDialogComponent, {
        data:{
          title: "Delete " + product.name,
          product: product,
        }
      });
    }

    openAddToCartDialog(product: Product) {
      const dialogRef = this.dialog.open(AddProductToCartDialogComponent, {
        data:{
          title: "Add " + product.name + " to Cart",
          product: product,
        }
      });
    }
}
