import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category, Material, Price, Product, ProductInCart } from '../model/product.model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Login, LoginResponse, Register, UserOrders } from '../model/list.model';

@Injectable({
    providedIn: 'root',
})
export class AppService {
    private apiUrl = environment.apiUrl;
    public loggedInUser = new BehaviorSubject<Login>(new Login());
    private categories = new BehaviorSubject<Category[]>([]);
    private products = new BehaviorSubject<Product[]>([]);
    private materials = new BehaviorSubject<Material[]>([]);
    private latestMaterialsPrice = new BehaviorSubject<Price[]>([]);
    private userOrders = new BehaviorSubject<UserOrders[]>([]);
    public defaultHeader = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    public currentHeader = new BehaviorSubject<HttpHeaders>(this.defaultHeader);
    public productsInCart = new BehaviorSubject<ProductInCart[]>([]);
   

    constructor(private http: HttpClient) {
        
    }

    getCategoriesFromDB() {
        this.http.get(this.apiUrl + '/categories', {headers: this.currentHeader.value}).subscribe({
            next: data => {
                this.categories.next(data as Category[]);
            },
            error: err => {
                console.log("Error", err);
            }
        })
    }

    onGetCategories() {
        return this.categories.asObservable();
    }

    getLatestMaterialsPriceFromDB() {
        this.http.get(this.apiUrl + '/latest-price', {headers: this.currentHeader.value}).subscribe({
            next: data => {
                this.latestMaterialsPrice.next(data as Price[]);
            },
            error: err => {
                console.log("Error", err);
            }
        })
    }

    onGetLatestMaterialsPrice() {
        return this.latestMaterialsPrice.asObservable();
    }

    getProductsFromDB() {
        this.http.get(this.apiUrl + '/products', {headers: this.currentHeader.value}).subscribe({
            next: data => {
                this.updateCartOnProductChanges(data as Product[]);
            },
            error: err => {
                console.log("Error", err);
            }
        })
    }

    onGetProducts() {
        return this.products.asObservable();
    }

    updateCartOnProductChanges(pds: Product[]){
        if(pds!=null && pds.length>0){
            let pICart = this.productsInCart.value;
            if(pICart.length!=0){
                let pIds:number[] = pds.map(p => p.id);
                //cart filtered based on latest products
                pICart = pICart.filter(pc => pIds.indexOf(pc.product.id)!=-1);
                if(pICart.length>0){
                    //update product reference with new products in the cart
                    pICart = pICart.map(pc => {
                        pc.product = pds.filter(p => p.id==pc.product.id)[0];
                        pc.product.isAddedToCart=true;
                        return pc;
                    });
                }
                this.productsInCart.next(pICart);
            }
        }
        this.products.next(pds);
        
    }

    getMaterialsFromDB() {
        this.http.get(this.apiUrl + '/materials', {headers: this.currentHeader.value}).subscribe({
            next: data => {
                this.materials.next(data as Material[]);
            },
            error: err => {
                console.log("Error", err);
            }
        })
    }

    onGetMaterials() {
        return this.materials.asObservable();
    }

    getOrdersSummaryFromDB() {
        this.http.get(this.apiUrl + '/get-orders', {headers: this.currentHeader.value}).subscribe({
            next: data => {
                console.log("data", data as UserOrders[]);
                this.userOrders.next(data as UserOrders[]);
            },
            error: err => {
                console.log("Error", err);
            }
        })
    }

    onGetOrdersSummary() {
        return this.userOrders.asObservable();
    }

}