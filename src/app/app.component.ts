import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../Components/header/header.component';
import { LeftMenuComponent } from '../Components/left-menu/left-menu.component';
import { MenuItems } from '../model/list.model';
import { AddProductComponent } from '../Components/add-product/add-product.component';
import { AddCategoryComponent } from '../Components/add-category/add-category.component';
import { CommonModule } from '@angular/common';
import { Category, Material, Price, Product } from '../model/product.model';
import { ProductComponent } from '../Components/product/product.component';
import { AppService } from '../service/app.service';
import { Subscription } from 'rxjs';
import { CategoriesComponent } from '../Components/categories/categories.component';
import { FileUploadComponent } from '../Components/Common/file-upload/file-upload.component';
import { UpdatePricingComponent } from '../Components/update-pricing/update-pricing.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
             RouterOutlet,HeaderComponent, LeftMenuComponent, AddProductComponent, AddCategoryComponent, CommonModule, 
             ProductComponent, CategoriesComponent, UpdatePricingComponent
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
  latestMaterialsPriceSubscription = new Subscription();
  categories: Category[] = [];
  products: Product[] = [];
  materials: Material[] = [];
  latestMaterialsPrice: Price[] = [];

  constructor(private appService: AppService){}

  ngOnInit(): void {
      this.appService.getCategoriesFromDB();
      this.appService.getProductsFromDB();
      this.appService.getMaterialsFromDB();
      this.appService.getLatestMaterialsPriceFromDB();

      this.categoriesSubscription = this.appService.onGetCategories().subscribe({
        next: value => {
          this.categories = value;
        }
      });

      this.productsSubscription = this.appService.onGetProducts().subscribe({
        next: value => {
          this.products = value;
          this.products = this.products.map(p => {
            if(p.productImage!=null){
              p.productImage.fileType = p.productImage.name.split(".")[1];
              p.imageSrc = "data:image/" + p.productImage.fileType + ";base64, " + p.productImage.base64;
            }
            return p;
          });
        }
      });

      this.materialsSubscription = this.appService.onGetMaterials().subscribe({
        next: value => {
          this.materials = value;
        }
      });

      this.latestMaterialsPriceSubscription = this.appService.onGetLatestMaterialsPrice().subscribe({
        next: value => {
          this.latestMaterialsPrice = value;
        }
      });
  }

  getCurrentActiveMenu(e:any){
    this.listItems = e;
    this.activePage = this.listItems.filter(i => i.isActive==true)[0];
  }
  
}
 