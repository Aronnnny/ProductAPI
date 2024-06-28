import { Routes } from '@angular/router';
import { ProductListComponent } from './features/product/product-list/product-list.component';
import { AddProductComponent } from './features/product/add-product/add-product.component';

export const routes: Routes = [
  {path: 'admin/products', component: ProductListComponent},
  {path: 'admin/products/add', component: AddProductComponent}
];
