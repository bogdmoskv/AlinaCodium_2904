import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConfigService } from "./app-config.service";
import { Observable } from "rxjs";
import { Product } from "../models/product.model";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor(
        private http: HttpClient,
        private appConfig: AppConfigService
    ) { }

    //Получение всех товаров
    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.appConfig.apiUrl}/api/products`);
    }

    //Получение товара по ID
    getProduct(id: number): Observable<Product> {
        return this.http.get<Product>(`${this.appConfig.apiUrl}/api/products/${id}`);
    }

}