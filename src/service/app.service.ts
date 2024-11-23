import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Category, Material, Product } from '../model/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',  
})
export class AppService {
    private apiUrl = environment.apiUrl;
    private categories = new BehaviorSubject<Category[]>([]);
    private products = new BehaviorSubject<Product[]>([]);
    private materials = new BehaviorSubject<Material[]>([]);
    
    constructor(private http: HttpClient){}

    getCategoriesFromDB(){
        this.http.get(this.apiUrl + '/categories').subscribe({
            next: data => {
                this.categories.next(data as Category[]);
            },
            error: err => { 
                console.log("Error", err);
            }
        })
    }

    onGetCategories(){
        return this.categories.asObservable();
    }

    getProductsFromDB(){
        this.http.get(this.apiUrl + '/products').subscribe({
            next: data => {
                this.products.next(data as Product[]);
            },
            error: err => { 
                console.log("Error", err);
            }
        })
    }

    onGetProducts(){
        return this.products.asObservable();
    }

    getMaterialsFromDB(){
        this.http.get(this.apiUrl + '/materials').subscribe({
            next: data => {
                this.materials.next(data as Material[]);
            },
            error: err => { 
                console.log("Error", err);
            }
        })
    }

    onGetMaterials(){
        return this.materials.asObservable();
    }

}