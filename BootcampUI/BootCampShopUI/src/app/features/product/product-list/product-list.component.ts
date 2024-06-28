import { Product } from './../../models/product.model';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FontAwesomeModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  faPen = faPen;

  products?: Product[];

  constructor(private productService : ProductService){
    this.loadProducts();
  }

  loadProducts(){
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    })
  }

  ngOnInit(): void {
    this.productService.getProducts()
    .subscribe({
      next : (response) => {
        this.products = response;
      }
    })
  }

  deleteProduct(id: string){
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    })
  }
}
