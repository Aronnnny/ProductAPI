import { Product } from './../../models/product.model';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet, Router} from '@angular/router';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularToastifyModule, ToastService } from 'angular-toastify';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FontAwesomeModule, AngularToastifyModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  faTrash = faTrash;
  faPen = faPen;

  products?: Product[];

  constructor(private productService : ProductService, private _toastService : ToastService, private router: Router){
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
      this._toastService.success("Product Deleted.");
    })
  }

  editProduct(productId: string): void {
    this.router.navigate(['admin/products/edit', { id: JSON.stringify(productId) }]);
  }
}
