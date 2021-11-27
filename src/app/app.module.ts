import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './service/product.service';
import { Routes, RouterModule } from "@angular/router";
import { ProductCategoryListComponent } from './component/product-category-list/product-category-list.component';
import { SearchComponent } from './component/search/search.component';
import { FullDetailsComponent } from './component/full-details/full-details.component';

const routes:Routes = [
  {path: "fullDetails/:id", component: FullDetailsComponent},
  {path: "search/:keyword", component: ProductListComponent},
  {path: "category/:id", component: ProductListComponent},
  {path: "category", component: ProductListComponent},
  {path: "products", component: ProductListComponent},
  {path: "", redirectTo: 'products', pathMatch:'full' },
  {path: "**", redirectTo: 'products', pathMatch:'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryListComponent,
    SearchComponent,
    FullDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
