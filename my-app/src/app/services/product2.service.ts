import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Product2 } from "../models/product2.model";

@Injectable({
    providedIn: 'root'
})
export class ProductSerice2{
    getProducts(): Observable<Product2[]>{
        const products: Product2[] = [
            { id: 1, name: 'Laptop'},
            { id: 2, name: 'Phone'},
            { id: 3, name: 'Tablet'}
        ]

        return of(products);
    }
}