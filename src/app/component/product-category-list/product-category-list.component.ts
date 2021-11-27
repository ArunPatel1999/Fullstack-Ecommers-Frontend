import { Component, OnInit } from '@angular/core';
import { ProductCategory } from "src/app/entitys/product-category";
import { ProductService } from "src/app/service/product.service";


@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.css']
})
export class ProductCategoryListComponent implements OnInit {

  public productCategorys: ProductCategory[];

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.getAllProductCategory();
  }

  private getAllProductCategory():void {
      this.productService.getAllProductCategory().subscribe( data => this.productCategorys = data);
  }

}
