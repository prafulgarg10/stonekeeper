import { Component, OnInit } from '@angular/core';
import { Category, Price, Product, ProductInCart } from '../../model/product.model';
import { AppService } from '../../service/app.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule, MatButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  cartProducts: Product[] = [];
  cartProductsFinal: ProductInCart[] = [];
  cartProductsSubscription = new Subscription();
  categories: Category[] = [];
  categorySubscription: Subscription = new Subscription();
  latestPrice: Price[] = [];
  latestPriceSubscription: Subscription = new Subscription();
  totalItemCount: number = 0;
  totalPrice: number = 0;

  constructor(private appService: AppService){

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
        this.cartProducts = value;
        let crtProductsFinal = this.cartProducts.map(p => {
          let cpF = new ProductInCart();
          cpF.product = p;
          if(this.cartProductsFinal.length>0){
            let match = this.cartProductsFinal.filter(pd => pd.product.id==p.id);
            if(match && match.length>0){
              cpF.updatedWeight = match[0].updatedWeight;
              cpF.updatedQuantity = match[0].updatedQuantity;
              cpF.amount = this.getPrice(p.category, p.material, cpF.updatedWeight);
              return cpF;
            }
          }
          cpF.updatedWeight = p.weight;
          cpF.updatedQuantity = p.quantity;
          cpF.amount = this.getPrice(p.category, p.material, p.weight);
          return cpF;
        });
        this.cartProductsFinal = crtProductsFinal;
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
      item.amount = this.getPrice(item.product.category, item.product.material, item.updatedWeight);
      this.updateTotalPriceAndTotalCount();
    }
  }

  getPrice(ctg:number, material:number, wgt:number){
    let category = this.categories.filter(c => c.id==ctg);
    let purity:number = 100;
    let weight:number = wgt;
    let price:number = this.latestPrice.filter(p => p.materialId==material)[0]?.price;
    let amount = 0;
    if(category && category.length>0){
      purity = category[0].purity;
      amount = (1.0*purity*price*weight)/1000;
    }
    return amount;
  }

  removeProductFromCart(product: ProductInCart){
    this.cartProducts = this.cartProducts.filter(p => p.id!=product.product.id);
    this.appService.productsInCart.next(this.cartProducts);
  }

  updateTotalPriceAndTotalCount(){
    this.totalItemCount = this.cartProducts.length;
    let price = 0;
    this.cartProductsFinal.forEach(p => price += p.amount);
    this.totalPrice = price;
  }
}
