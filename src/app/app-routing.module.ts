import { ChamsocComponent } from './components/chamsoc/chamsoc.component';
import { GioithieuComponent } from './components/gioithieu/gioithieu.component';
import { LienheComponent } from './components/lienhe/lienhe.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductsDetailComponent } from './components/products-detail/products-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'account',
    component: AccountComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  { path: 'cart', component: CartComponent },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'products/loaisanpham/:tenlsp',
    component: ProductsComponent,
  },
  {
    path: 'products/loaithuonghieu/:tenth',
    component: ProductsComponent,
  },
  {
    path: 'products/filterData',
    component: ProductsComponent,
  },
  {
    path: 'product_detail/:masp',
    component: ProductsDetailComponent,
  },
  {
    path: 'lienhe',
    component: LienheComponent,
  },
  {
    path: 'gioithieu',
    component: GioithieuComponent,
  },
  {
    path: 'chamsoc',
    component: ChamsocComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
