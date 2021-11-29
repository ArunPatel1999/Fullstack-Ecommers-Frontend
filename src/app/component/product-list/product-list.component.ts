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
  
  private endUrl: string;
  private previousUrl:string ="" ;

  public pageNumber: number = 1;
  public perPageElement: number = 10;
  public totalElement: number =0;

  constructor(private productService:ProductService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( () =>  { 
      this.listProductWithPaginations();
    });
    
  }

  // private listProduct() {
  //   if(this.route.snapshot.paramMap.has("id")) 
  //       this.endUrl = `/products/search/findByCategoryId?id=`+this.route.snapshot.paramMap.get("id");
  //   else if(this.route.snapshot.paramMap.has("keyword"))   
  //       this.endUrl = `/products/search/findByNameContainingIgnoreCase?keyword=`+this.route.snapshot.paramMap.get("keyword");
  //   else
  //       this.endUrl = "/products";    

  //   this.productService.getAllProduct(this.endUrl).subscribe(
  //     data => this.products =data
  //   )
  // } 

  public dropDownChangePerPaze(perPageElement:number) {
      this.perPageElement=perPageElement;
      this.pageNumber=1;
      this.getAllInService();
  }

  public pageNumberChange() {
    this.getAllInService();
  }

  public listProductWithPaginations() {
    if(this.route.snapshot.paramMap.has("id")) 
        this.endUrl = `/products/search/findByCategoryId?id=`+this.route.snapshot.paramMap.get("id")+'&';  
    else if(this.route.snapshot.paramMap.has("keyword"))   
        this.endUrl = `/products/search/findByNameContainingIgnoreCase?keyword=`+this.route.snapshot.paramMap.get("keyword")+'&';
    else
        this.endUrl = "/products?"; 

    this.pageNumber = 1;
    this.perPageElement=10;


   this.getAllInService();
  } 

  private getAllInService() {
     this.productService.getAllProductByPageination(this.endUrl+`page=${this.pageNumber-1}&size=${this.perPageElement}`).subscribe(
      data => { 
          this.products = data._embedded.products; 
          this.pageNumber = data.page.number+1;
          this.perPageElement = data.page.size;
          this.totalElement = data.page.totalElements;
        }
    )
  }
}
