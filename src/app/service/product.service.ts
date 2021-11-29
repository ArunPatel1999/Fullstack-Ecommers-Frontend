import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Product } from "../entitys/product";
import { ProductCategory } from "../entitys/product-category";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private baseUrl = "http://localhost:8085/api";
  
  constructor(private httpClient:HttpClient ) { }
  
  //  GET All Product Categories
  public getAllProductCategory():Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(`${this.baseUrl}/productCategory`).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  // Get All Product and By Product Categories Id  without pagibnation
  public getAllProduct(endUrl:String ): Observable<Product[]> {
    return this.httpClient.get<GetResponseProduct>(this.baseUrl+endUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  // Get All Product and By Product Categories Id  without pagibnation
  public getAllProductByPageination(endUrl:String): Observable<GetResponseProductWithPageination> {
    return this.httpClient.get<GetResponseProductWithPageination>(this.baseUrl+endUrl);
  }

  // Get products By Id
  public getProductById(id:number):Observable<Product> {
    return this.httpClient.get<Product>(this.baseUrl +"/products/"+id); 
  }

}

interface GetResponseProductWithPageination {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number:number;
  }
}



interface GetResponseProduct {
  _embedded: {
    products: Product[];
  }
}


interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[]
  }
}