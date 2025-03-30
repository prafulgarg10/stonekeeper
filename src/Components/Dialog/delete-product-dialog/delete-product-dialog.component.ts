import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../model/product.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AppService } from '../../../service/app.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

@Component({
  selector: 'app-delete-product-dialog',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './delete-product-dialog.component.html',
  styleUrl: './delete-product-dialog.component.css'
})
export class DeleteProductDialogComponent implements OnInit {
  public title: string = '';
  public product: Product = new Product();
  private apiUrl = environment.apiUrl;

  constructor(private dialogRef: MatDialogRef<DeleteProductDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {title: string, product: Product}, private appService: AppService, private http: HttpClient, private dialog: MatDialog){

  }

  ngOnInit(){
    this.title = this.data.title;
    this.product = this.data.product; 
  }

  closeDialog(){
    this.dialogRef.close();
  }

  deleteProduct(){
    let postData = Object.assign({}, this.product as Product);
      this.http.post(this.apiUrl + '/delete-product', postData, {headers: this.appService.currentHeader.value}).subscribe({
          next: data => {
              if(data){
                console.log("result", data);
                this.openDialog('Product deleted Successfully.', 'Confirmation!', true);
              }
          },
          error: err => { 
              console.log("Error", err);
              this.openDialog('Problem deleting product. Please try again later.', 'Failure!');
          }
      })
  }

  openDialog(msg: string, title: string, isSuccess: boolean=false) {
        const dialogRef = this.dialog.open(MessageDialogComponent, {
          data:{
            message: msg,
            boxTitle: title
          }
        }).afterClosed().subscribe(() => (this.closeDialog(), isSuccess ? this.appService.getProductsFromDB() : ''));
      }
}
