import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category, Material, Price, Product } from '../model/product.model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Login, LoginResponse, Register } from '../model/list.model';

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
    public defaultHeader = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    public currentHeader = new BehaviorSubject<HttpHeaders>(this.defaultHeader);
    public productsInCart = new BehaviorSubject<Product[]>([]);
   

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
        this.http.get(this.apiUrl + '/latest-price').subscribe({
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
        this.http.get(this.apiUrl + '/products').subscribe({
            next: data => {
                this.products.next(data as Product[]);
            },
            error: err => {
                console.log("Error", err);
            }
        })
    }

    onGetProducts() {
        return this.products.asObservable();
    }

    getMaterialsFromDB() {
        this.http.get(this.apiUrl + '/materials').subscribe({
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

}