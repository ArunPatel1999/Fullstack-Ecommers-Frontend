import { Component, OnInit } from '@angular/core';
import { ProductService } from "src/app/service/product.service";
import { Product } from "src/app/entitys/product";
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public products: Product[];
  private endUrl : String;

  constructor(private productService:ProductService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( () =>  { 
      this.listProduct(); 
    });
    
  }

  private listProduct() {
    if(this.route.snapshot.paramMap.has("id")) 
        this.endUrl = `/products/search/findByCategoryId?id=`+this.route.snapshot.paramMap.get("id");
    else if(this.route.snapshot.paramMap.has("keyword"))   
        this.endUrl = `/products/search/findByNameContainingIgnoreCase?keyword=`+this.route.snapshot.paramMap.get("keyword");
    else
        this.endUrl = "/products/";    

    this.productService.getAllProduct(this.endUrl).subscribe(
      data => this.products =data
    )
  } 
}
