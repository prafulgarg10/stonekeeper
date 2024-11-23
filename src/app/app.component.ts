import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../Components/header/header.component';
import { LeftMenuComponent } from '../Components/left-menu/left-menu.component';
import { MenuItems } from '../model/list.model';
import { AddProductComponent } from '../Components/add-product/add-product.component';
import { AddCategoryComponent } from '../Components/add-category/add-category.component';
import { CommonModule } from '@angular/common';
import { Category, Material, Product } from '../model/product.model';
import { ProductComponent } from '../Components/product/product.component';
import { AppService } from '../service/app.service';
import { Subscription } from 'rxjs';
import { CategoriesComponent } from '../Components/categories/categories.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
             RouterOutlet,HeaderComponent, LeftMenuComponent, AddProductComponent, AddCategoryComponent, CommonModule, 
             ProductComponent, CategoriesComponent
            ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'StoneKeeper';
  listItems:MenuItems[] = [{name: 'Update Pricing', id: 1, isActive: false}, {name: 'All Products', id: 2, isActive: true}, {name: 'All Categories', id: 3, isActive: false}, {name: 'Add Product', id: 4, isActive: false}, {name: 'Add Category', id: 5, isActive: false}];
  activePage: MenuItems = this.listItems[1];
  categoriesSubscription = new Subscription();
  productsSubscription = new Subscription();
  materialsSubscription = new Subscription();
  categories: Category[] = [];
  products: Product[] = [];
  materials: Material[] = [];

  constructor(private appService: AppService){}

  ngOnInit(): void {
      this.appService.getCategoriesFromDB();
      this.appService.getProductsFromDB();
      this.appService.getMaterialsFromDB();

      this.categoriesSubscription = this.appService.onGetCategories().subscribe({
        next: value => {
          this.categories = value;
        }
      });

      this.productsSubscription = this.appService.onGetProducts().subscribe({
        next: value => {
          this.products = value;
        }
      });

      this.materialsSubscription = this.appService.onGetMaterials().subscribe({
        next: value => {
          this.materials = value;
        }
      });
  }

  getCurrentActiveMenu(e:any){
    this.listItems = e;
    this.activePage = this.listItems.filter(i => i.isActive==true)[0];
  }
  
}
 