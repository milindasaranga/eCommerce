import { Injectable } from '@angular/core';
import { Product, SortingTypes, FilterBy } from './../../model/product';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as ProductList from './../../assignment-plp.json';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: Product[] = [];
  prodSubject = new ReplaySubject<Product[]>(1);

  numberOfProductByPage = 6;

  constructor(private http: HttpClient) {
    this.fetchProdcutList(ProductList.hits);
  }

  emitProducts(): void{
    this.prodSubject.next(this.products);
  }

  fetchProdcutList(actualProdList: any[]): void{    

    this.products = [];

    actualProdList.forEach(pItem => {
      const productItem: any = {};
      productItem.idProduct = pItem.objectID;
      productItem.name = pItem.name;
      productItem.description = pItem.name;
      productItem.price = pItem.price.AED.default;
      productItem.stock= pItem.ordered_qty;
      productItem.Category= pItem.name;
      productItem.image= pItem.image_url;
      productItem.discount = Math.floor(Math.random() * 11);
      productItem.brand = pItem.brand_name;
      productItem.soldBy = pItem.sold_by;

      this.products.push(productItem);
    });
    this.sortProductList("1");
  }

  sortProductList(sortOption: string): void {
    switch (sortOption) {
      case SortingTypes.priceHighLow:
        this.products = this.products.sort((prev, next) => prev.price < next.price ? 1 : -1);
        break;
      case SortingTypes.priceLowHigh:
        this.products = this.products.sort((prev, next) => prev.price > next.price ? 1 : -1);
        break;
      case SortingTypes.discountHighLow:
        this.products = this.products.sort((prev, next) => prev.discount < next.discount ? 1 : -1);
        break;
      default:
        break;
    }
    this.emitProducts();
  }

  //fetchProdcutList(): void{
    // this.http.get(environment.API).subscribe(
    //   (dataProducts: Result)=>{
    //     if(dataProducts.status == 200){
    //       this.products = dataProducts.result;
    //       this.emitProducts();
    //     }else{
    //       console.log("Error : "+dataProducts.message);

    //     }
    //   }
    // )
  //}

  getProductOnScroll(numberPage: number): Product[]{
    const numberOfPage = this.products.length/this.numberOfProductByPage;
    if( numberPage >0 || numberPage < numberOfPage ){
      const prodResult = this.products.slice(0, (numberPage+1)*this.numberOfProductByPage);
      return prodResult;
    }
    return null;
  }

  filterBySelection(itemList: FilterBy[]): void{
    if(itemList && itemList.length ===0){
      this.fetchProdcutList(ProductList.hits);
      return;
    }

    const filteredList:any[] = [];
    ProductList.hits.forEach((pItem)=>{
       itemList.forEach((f)=>{
        if(f.facets === "Brand" && f.itemName === pItem.brand_name){
          filteredList.push(pItem);
        }
        else if(f.facets === "Color" && pItem.color.includes(f.itemName)){
          filteredList.push(pItem);
        }
        else if(f.facets === "Sold By" && f.itemName === pItem.sold_by){
          filteredList.push(pItem);
        }
      });
    });
    this.fetchProdcutList(filteredList);
  }
}
