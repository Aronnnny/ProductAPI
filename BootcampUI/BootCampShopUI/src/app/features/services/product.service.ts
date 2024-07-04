import { Product } from './../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url: string = "https://localhost:7050";
  private api: string = "api/product";

  constructor(private http: HttpClient) { }

  getProducts() : Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/${this.api}`);
  }

  addProduct(product: Product) : Observable<void> {
    return this.http.post<void>(`${this.url}/${this.api}`, product);
  }
  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${this.api}/${id}`);
  }

  getProductByID(id: string) : Observable<Product> {
    console.log(id)
    return this.http.get<Product>(`${this.url}/${this.api}/${id}`);
  }

  updateProduct(id: string, product: Product) : Observable<void> {
    console.log(product)
    return this.http.put<void>(`${this.url}/${this.api}/${id}`, product);
  }
}
