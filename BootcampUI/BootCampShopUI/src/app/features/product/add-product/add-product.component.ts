import { ProductService } from './../../services/product.service';
import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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


  constructor(private productService: ProductService, private router: Router) { }

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
          alert("Product added.");
        },
        error: (response) => {
          const errorMessage = JSON.stringify(response.error) || response.message || 'Unknown Error.';
          alert(`${errorMessage}\nInvalid Product.`)
        }
      })
  }

  goToProductList(){
    this.router.navigate(['admin/products']);
  }
}
