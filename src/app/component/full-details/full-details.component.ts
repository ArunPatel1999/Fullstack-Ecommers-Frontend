import { Component, OnInit } from '@angular/core';
import { ProductService } from "src/app/service/product.service";
import { Product } from "src/app/entitys/product";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-full-details',
  templateUrl: './full-details.component.html',
  styleUrls: ['./full-details.component.css']
})
export class FullDetailsComponent implements OnInit {

  public product : Product = new Product();

  constructor(private productService: ProductService, private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(() => this.getProductById());
  }

  private getProductById() {
    this.productService.getProductById(+this.router.snapshot.paramMap.get("id")).subscribe( data => this.product = data);
  }
}
