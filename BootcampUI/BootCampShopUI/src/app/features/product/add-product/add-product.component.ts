import { ProductService } from './../../services/product.service';
import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  newProduct = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required)
  })


  constructor(private productService: ProductService, private router: Router, private _toastService : ToastService) { }

  convertToProduct(): Product {
    let product: Product = {
      id: "",
      name: this.newProduct.get("name")?.value ?? "",
      description: this.newProduct.get("description")?.value ?? "",
      price: parseFloat(this.newProduct.get("price")?.value ?? "0")
    }
    return product;
  }

  addProduct(): void {
    let product = this.convertToProduct()

    this.productService.addProduct(product)
      .subscribe({
        next: (response) => {
          this._toastService.success("Product Added.");
          this.goToProductList();
        },
        error: (response) => {
          const errorMessage = JSON.stringify(response.error) || response.message || 'Unknown Error.';
          alert(`${errorMessage}`)
          this._toastService.error("Invalid Product.");
        }
      })
  }

  goToProductList(){
    this.router.navigate(['admin/products']);
  }
}
