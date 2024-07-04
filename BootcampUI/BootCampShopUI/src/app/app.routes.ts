import { Routes } from '@angular/router';
import { ProductListComponent } from './features/product/product-list/product-list.component';
import { AddProductComponent } from './features/product/add-product/add-product.component';
import { UpdateProductComponent } from './features/product/update-product/update-product.component';

export const routes: Routes = [
  {path: 'admin/products', component: ProductListComponent},
  {path: 'admin/products/add', component: AddProductComponent},
  {path: 'admin/products/edit', component: UpdateProductComponent}
];
