import { Component, Input } from '@angular/core';
import { Category, Material, Product } from '../../model/product.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { EditProductDialogComponent } from '../Dialog/edit-product-dialog/edit-product-dialog.component';
import { DeleteProductDialogComponent } from '../Dialog/delete-product-dialog/delete-product-dialog.component';
import { AppService } from '../../service/app.service';

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

  constructor(private dialog: MatDialog, private appService: AppService){

  }

   openEditDialog(product: Product) {
      const dialogRef = this.dialog.open(EditProductDialogComponent, {
        data:{
          title: "Edit '" + product.name + "'",
          product: product,
          categories: this.categories,
          materials: this.materials
        }
      });
    }

    openDeleteDialog(product: Product) {
      const dialogRef = this.dialog.open(DeleteProductDialogComponent, {
        data:{
          title: "Delete '" + product.name + "'",
          product: product,
        }
      });
    }

    addProductToCart(product: Product) {
      product.isAddedToCart = !product.isAddedToCart;
      if(product.isAddedToCart){
        var pdInCart = this.appService.productsInCart.value;
        pdInCart.push(product);
        this.appService.productsInCart.next(pdInCart);
      }
      else{
        var pdInCart = this.appService.productsInCart.value;
        pdInCart = pdInCart.filter(p=> p.id!=product.id);
        this.appService.productsInCart.next(pdInCart);
      }
    }
}
