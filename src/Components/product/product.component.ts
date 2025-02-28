import { Component, Input } from '@angular/core';
import { Product } from '../../model/product.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { EditProductDialogComponent } from '../Dialog/edit-product-dialog/edit-product-dialog.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() productsList: Product[] = [];

  constructor(private dialog: MatDialog){

  }

   openDialog(product: Product) {
      const dialogRef = this.dialog.open(EditProductDialogComponent, {
        data:{
          title: "Edit " + product.name,
          product: product
        }
      });
    }
}
