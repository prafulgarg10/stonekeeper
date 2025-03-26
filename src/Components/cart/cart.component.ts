import { Component, OnInit } from '@angular/core';
import { Category, Price, Product, ProductInCart } from '../../model/product.model';
import { AppService } from '../../service/app.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { FormatCurrencyPipe } from '../../pipes/format-currency.pipe';
import { Order } from '../../model/list.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../Dialog/message-dialog/message-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule, MatButtonModule, FormatCurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  cartProductsFinal: ProductInCart[] = [];
  cartProductsSubscription = new Subscription();
  categories: Category[] = [];
  categorySubscription: Subscription = new Subscription();
  latestPrice: Price[] = [];
  latestPriceSubscription: Subscription = new Subscription();
  totalItemCount: number = 0;
  totalPrice: number = 0;
  private apiUrl = environment.apiUrl;

  constructor(private appService: AppService, private http: HttpClient, private dialog: MatDialog, private router: Router){

  }

  ngOnInit(): void {
    this.categorySubscription = this.appService.onGetCategories().subscribe({
      next: value => {
        this.categories = value;
      }
    });

    this.latestPriceSubscription = this.appService.onGetLatestMaterialsPrice().subscribe({
      next: value => {
        this.latestPrice = value;
      }
    });

    this.cartProductsSubscription = this.appService.productsInCart.asObservable().subscribe({
      next: value => {
        this.cartProductsFinal = value;
        this.cartProductsFinal = this.cartProductsFinal.map(p => {
          p.purity = this.getPurity(p.product.category);
          p.updatedQuantity = p.updatedQuantity==0 ? p.product.quantity : p.updatedQuantity;
          p.updatedWeight = p.updatedWeight==0 ? p.product.weight : p.updatedWeight;
          p.amount = this.getPrice(p.purity, p.product.material, p.updatedWeight);
          return p;
        });
        
        this.updateTotalPriceAndTotalCount();
      }
    });
  }

  onQuantityChange(e:any, item: ProductInCart){
    let val = e?.target?.value;
    if(val){
      if(val<item.product.quantity){
        item.updatedQuantity = val;
      } 
      else{
        let qty = item.product.quantity;
        item.updatedQuantity = qty;
        e.target.value = qty;
      }
    }
  }

  onWeightChange(e:any, item: ProductInCart){
    let val = e?.target?.value;
    if(val){
      if(val<item.product.weight){
        item.updatedWeight = val;

      } 
      else{
        let wght = item.product.weight;
        item.updatedWeight = wght;
        e.target.value = wght;
      }
      item.amount = this.getPrice(item.purity, item.product.material, item.updatedWeight);
      this.updateTotalPriceAndTotalCount();
    }
  }

  getPrice(purity:number, material:number, wgt:number){
    let weight:number = wgt;
    let price:number = this.latestPrice.filter(p => p.materialId==material)[0]?.price;
    let amount = 0;
    amount = (1.0*purity*price*weight)/1000;
    return amount;    
  }

  removeProductFromCart(product: ProductInCart){
    product.product.isAddedToCart = false;
    this.cartProductsFinal = this.cartProductsFinal.filter(p => p.product.id!=product.product.id);
    this.appService.productsInCart.next(this.cartProductsFinal);
  }

  updateTotalPriceAndTotalCount(){
    this.totalItemCount = this.cartProductsFinal.length;
    let price = 0;
    this.cartProductsFinal.forEach(p => price += p.amount);
    this.totalPrice = price;
  }

  getPurity(pCid: number):number{
    let cat = this.categories.filter(c => c.id==pCid);
    if(cat && cat.length>0){
      return cat[0].purity;
    }
    return 100;
  }

  placeOrder(){
    let arr: Order[] = [];
    this.cartProductsFinal.map(p => {
      let pOrder = new Order();
      pOrder.productId = p.product.id;
      pOrder.quantity = p.updatedQuantity;
      pOrder.weight = p.updatedWeight;
      arr.push(pOrder);
    });
    let postData:any = arr.length==0 ? {} : arr;
    this.http.post(this.apiUrl + '/place-order', postData, {headers: this.appService.currentHeader.value}).subscribe({
      next: (data:any) => {
          if(data && data?.orderId>0){
            this.openDialog('Order created Successfully.', 'Confirmation!', true);
            console.log("Order created");
          }
      },
      error: (err) => { 
        let res:any = err.error;
        if(res?.message){
          this.openDialog(res.message, 'Failure!');
        }
        else{
          this.openDialog('Failed to create the order. Please try again later.', 'Failure!');
        }
      }
  })
  }

  openDialog(msg: string, title: string, success: boolean = false) {
      const dialogRef = this.dialog.open(MessageDialogComponent, {
        data:{
          message: msg,
          boxTitle: title
        }
      }).afterClosed().subscribe(() => {
        if(success){
          this.appService.getProductsFromDB();
        this.appService.productsInCart.next([]);
        this.router.navigateByUrl("/");
        }
        
      });
    }

}
