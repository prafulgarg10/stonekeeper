import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppService } from '../../service/app.service';
import { UserOrders } from '../../model/list.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-orders',
    imports: [MatIconModule, MatTooltipModule, CommonModule],
    templateUrl: './orders.component.html',
    styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit{
  orders: UserOrders[] = [];
  ordersSubscription: Subscription = new Subscription();
  constructor(private appService: AppService){

  }

  ngOnInit(){
    this.ordersSubscription = this.appService.onGetOrdersSummary().subscribe({
      next : value => {
        this.orders = value;
        this.orders = this.orders!=null ? this.orders.map(o => {
          o.products = o.products!=null ? o.products.map(p => {
            if(p.productImage!=null){
              p.productImage.fileType = p.productImage.name.split(".")[1];
              p.imageSrc = "data:image/" + p.productImage.fileType + ";base64, " + p.productImage.base64;
            }
            return p;
          }) : o.products;

          if(o.createdOn!=null&& o.createBy!=""&&!o.isDateUpdated){
            let formattedDate = new Date(o.createdOn).toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: true,
            });
            o.createdOn = formattedDate;
            o.isDateUpdated = true;
          }
          return o;
        }) : this.orders;
      } 
    })
  }

  downloadInvoice(order: UserOrders){

  }
}
