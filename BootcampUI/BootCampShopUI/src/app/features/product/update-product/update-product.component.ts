import { Product } from './../../models/product.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from 'angular-toastify';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit, OnDestroy {

  private productId?: string;
  private product?: Product;
  private productCheckInterval: any;

  productForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    price: new FormControl('', Validators.required),
  });

  constructor(private toastService: ToastService, private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  getProduct(id: string): void {
    this.productService.getProductByID(id).subscribe({
      next: (response) => {
        this.product = response

        this.productForm.patchValue({
          ...this.product,
          price: this.product.price.toString(),
        });
      },
      error: () => {
        this.toastService.error("Invalid product.");
      }
    })
  }

  checkProduct(id: string): void {
    this.productService.getProductByID(id).subscribe({
      error: () => {
        this.toastService.error("Invalid Product.");
        this.router.navigate([""])
      }
    })
  }

  convertToProduct(): Product {
    let product: Product = {
      id: this.productId ?? "",
      name: this.productForm.get("name")?.value ?? "",
      description: this.productForm.get("description")?.value ?? "",
      price: parseFloat(this.productForm.get("price")?.value ?? "0")
    }
    return product;
  }

  resetProduct(): void {
    this.router.navigate(["/admin/products"]);
  }

  updateProduct(): void {
    let product = this.convertToProduct()
    console.log(product)

    this.productService.updateProduct(product.id, product)
      .subscribe({
        next: () => {
          this.toastService.success("Product updated.")
        },
        error: () => {
          this.toastService.error(`Invalid Product.`)
        }
      })
      this.router.navigate(["/admin/products"]);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = JSON.parse(params.get('id') || '{}') as string;
      this.productCheckInterval = setInterval(() => {
        this.checkProduct(this.productId!);
      }, 10000);
      this.getProduct(this.productId);
    });
  }

  ngOnDestroy(): void {
    if (this.productCheckInterval) {
      clearInterval(this.productCheckInterval)
    }
  }

}
